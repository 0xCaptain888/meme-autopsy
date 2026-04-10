/**
 * four.meme adapter — project discovery and narrative source collection.
 */

import type { NarrativeSource, Project } from "@/types/domain";

const FOURMEME_BASE_URL =
  process.env.FOURMEME_BASE_URL || "https://four.meme";

// ---------------------------------------------------------------------------
// Discover projects from four.meme (placeholder)
// ---------------------------------------------------------------------------

/**
 * Attempts to discover new meme projects from the four.meme platform.
 *
 * TODO: four.meme may not expose a public API. Replace this stub with a real
 * implementation once an endpoint is confirmed or a scraping strategy is approved.
 */
export async function discoverProjectsFromFourMeme(
  _limit?: number,
): Promise<unknown[]> {
  // TODO: Implement once four.meme API details are available.
  // Potential approach: scrape the discovery / trending page, or use an
  // authenticated API if one becomes available.
  return [];
}

// ---------------------------------------------------------------------------
// Fetch project description from four.meme
// ---------------------------------------------------------------------------

export async function fetchFourMemeDescription(
  contractAddress: string,
): Promise<string | null> {
  try {
    const url = `${FOURMEME_BASE_URL}/token/${contractAddress}`;
    const res = await fetch(url, {
      headers: {
        Accept: "text/html",
        "User-Agent": "MemeAutopsy/1.0",
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.error(
        `[fourmeme] HTTP ${res.status} for ${contractAddress}`,
      );
      return null;
    }

    const html = await res.text();

    // Attempt to extract description from common meta / OG tags or page body.
    // This is best-effort; the real DOM structure may differ.
    const ogMatch = html.match(
      /<meta\s+property="og:description"\s+content="([^"]*)"/i,
    );
    if (ogMatch?.[1]) {
      return decodeHtmlEntities(ogMatch[1]).trim() || null;
    }

    const descMatch = html.match(
      /<meta\s+name="description"\s+content="([^"]*)"/i,
    );
    if (descMatch?.[1]) {
      return decodeHtmlEntities(descMatch[1]).trim() || null;
    }

    // Fallback: try to find a description block in the page body
    const bodyTextMatch = html.match(
      /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    );
    if (bodyTextMatch?.[1]) {
      return stripHtml(bodyTextMatch[1]).trim() || null;
    }

    return null;
  } catch (err) {
    console.error("[fourmeme] fetchFourMemeDescription error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Collect narrative sources from multiple origins
// ---------------------------------------------------------------------------

export async function collectNarrativeSources(
  project: Project,
  input?: Record<string, unknown>,
): Promise<NarrativeSource[]> {
  const sources: NarrativeSource[] = [];
  const now = new Date().toISOString();

  // 1. Try four.meme description
  if (project.contract_address) {
    try {
      const fourMemeText = await fetchFourMemeDescription(
        project.contract_address,
      );
      if (fourMemeText) {
        sources.push({
          sourceType: "four_meme",
          text: fourMemeText,
          url: `${FOURMEME_BASE_URL}/token/${project.contract_address}`,
          fetchedAt: now,
        });
      }
    } catch {
      // Graceful failure — skip this source
    }
  }

  // 2. Try website text if project.websiteUrl exists
  if (project.websiteUrl) {
    try {
      const websiteText = await fetchWebsiteText(project.websiteUrl);
      if (websiteText) {
        sources.push({
          sourceType: "website",
          text: websiteText,
          url: project.websiteUrl,
          fetchedAt: now,
        });
      }
    } catch {
      // Graceful failure — skip this source
    }
  }

  // 3. Manual input narrative
  if (input?.coreNarrative && typeof input.coreNarrative === "string") {
    const text = input.coreNarrative.trim();
    if (text.length > 0) {
      sources.push({
        sourceType: "manual_narrative",
        text,
        fetchedAt: now,
      });
    }
  }

  // 4. Manual community behavior
  if (
    input?.communityBehavior &&
    typeof input.communityBehavior === "string"
  ) {
    const text = input.communityBehavior.trim();
    if (text.length > 0) {
      sources.push({
        sourceType: "manual_community",
        text,
        fetchedAt: now,
      });
    }
  }

  return sources;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function fetchWebsiteText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "text/html",
        "User-Agent": "MemeAutopsy/1.0",
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) return null;

    const html = await res.text();

    // Extract text from <body>, stripping scripts/styles
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyHtml = bodyMatch?.[1] ?? html;

    const cleaned = bodyHtml
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "");

    const text = stripHtml(cleaned).trim();

    // Return a reasonable chunk (first 3000 chars) to avoid overwhelming downstream
    return text.length > 0 ? text.slice(0, 3000) : null;
  } catch (err) {
    console.error("[fourmeme] fetchWebsiteText error:", err);
    return null;
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
