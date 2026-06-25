const fs = require("fs");
const path = require("path");

async function generateBlog() {
  // 0. Skip generation if it's not the designated posting day (every 2 days)
  const force = process.argv.includes("--force");
  const daysSinceEpoch = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  if (daysSinceEpoch % 2 !== 0 && !force) {
    console.log("==========================================================");
    console.log("[SKIP] Skipping blog generation today (posting interval: every 2 days).");
    console.log("Use --force to run regardless of the 2-day schedule.");
    console.log("==========================================================");
    process.exit(0);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
  }

  // 1. Select topic based on the day of the week
  const day = new Date().getDay();
  let selectedPillar;
  
  if (day === 1 || day === 4) {
    selectedPillar = "ai";
  } else if (day === 2 || day === 5) {
    selectedPillar = "design";
  } else {
    selectedPillar = "shopify"; // Wed, Sat, Sun
  }

  const pillars = {
    ai: {
      category: "ai",
      categoryDisplay: "AI Automation",
      color: "border-brand-amber/20 bg-brand-amber/5",
      topicDescription: "artificial intelligence workflows, database sync middlewares, customer support LLM agents, OCR invoicing pipelines, or operations autopilot scripts",
      instructions: "Include a realistic mock code block styled inside a <div class=\"p-4 rounded-xl bg-zinc-950 border border-white/5 font-mono text-[12px] text-emerald-400 flex flex-col gap-1 mt-3\"> and containing a Node.js or Python snippet."
    },
    design: {
      category: "design",
      categoryDisplay: "Web Design",
      color: "border-brand-blue/20 bg-brand-blue/5",
      topicDescription: "Conversion Rate Optimization (CRO), F-shaped eye scan layout hotspots, Next.js page speed optimization, premium dark-mode styles, or conversion audit checklists",
      instructions: "Focus heavily on user psychology, minimizing friction, visual hierarchies, and loading speed stats (e.g. LCP, page load delays). No code block needed, focus on structure."
    },
    shopify: {
      category: "shopify",
      categoryDisplay: "Shopify Dev",
      color: "border-emerald-500/20 bg-emerald-500/5",
      topicDescription: "Shopify custom Liquid theme coding, Core Web Vitals page acceleration, custom checkout extensions, Storefront API headless ecommerce layouts, or inventory sync middlewares",
      instructions: "Focus on checkout optimizations, cart conversions, page loading boosts under 1.2s, and revenue increments. Include a Liquid markup or JavaScript code snippet inside a code block styled inside a <div class=\"p-4 rounded-xl bg-zinc-950 border border-white/5 font-mono text-[12px] text-emerald-400 flex flex-col gap-1 mt-3\">."
    }
  };

  const config = pillars[selectedPillar];

  // 2. Draft the Gemini Structured Prompt
  const prompt = `Write a high-quality, professional, and SEO-optimized technical blog article for VisuaLab (an AI automation & Web Dev agency).
Topic Focus: ${config.topicDescription}
Specific Instructions:
- ${config.instructions}
- Make sure the body content is written in clean, semantic HTML (using <p>, <ul>, <li>, and <h2> tags).
- Do NOT include any markdown code blocks (like \`\`\`html) inside the contentHtml value itself; write it as a raw, escaped HTML string.
- The article must contain exactly 3 subheadings (<h2> tags) in the body.
- The subheadings in contentHtml must match the Table of Contents (toc array) exactly.
- Each subheading <h2> tag in the HTML must have an 'id' attribute matching its lowercase-hyphenated title (e.g. <h2 id="my-subheading-title" class="text-lg font-bold text-white mt-4">My Subheading Title</h2>).
- Choose a realistic technical author name and matching role (e.g., Arthur Pendelton - Founder & Head of AI, Marcus Vance - Lead Shopify Developer, Clara Croft - UX/UI Design Director, or other engineers).

Tone and Writing Style (CRITICAL for humanizing the text):
- DO NOT use overused AI buzzwords or filler vocabulary (e.g., "delve", "testament", "revolutionize", "pave the way", "look no further", "rapidly evolving landscape", "crucial", "essential", "in summary", "moreover", "tapestry", "demystify").
- Write with a natural, punchy, conversational, and direct developer-to-developer tone. Speak from first-hand technical experience.
- Use active voice, short paragraphs (2-3 sentences max), and bold text naturally for key concepts to improve scannability.
- Incorporate specific technical details, real-world development friction points, and concrete configurations or numbers rather than vague generalizations.
- Ensure the introduction goes straight to the point (no fluffy build-up).

Generate the blog article strictly adhering to the JSON schema format:
{
  "title": "A catchy, SEO-optimized title",
  "excerpt": "A 2-sentence summary of the post for listing cards",
  "author": "Author Full Name",
  "role": "Author Professional Title",
  "intro": "A 2-sentence introduction paragraph",
  "toc": ["Subheading 1", "Subheading 2", "Subheading 3"],
  "contentHtml": "The complete HTML body content containing the 3 subheadings with matching IDs, paragraphs, and list elements"
}`;

  console.log(`Contacting Gemini API to write about: ${config.categoryDisplay}...`);

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          excerpt: { type: "STRING" },
          author: { type: "STRING" },
          role: { type: "STRING" },
          intro: { type: "STRING" },
          toc: {
            type: "ARRAY",
            items: { type: "STRING" }
          },
          contentHtml: { type: "STRING" }
        },
        required: ["title", "excerpt", "author", "role", "intro", "toc", "contentHtml"]
      }
    }
  };

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
    }

    const resJson = await response.json();
    const generatedText = resJson.candidates[0].content.parts[0].text;
    const blogData = JSON.parse(generatedText);

    // 3. Post-process properties (slug, dates, readTime)
    const slug = blogData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, "-");        // replace spaces with hyphens

    // Format today's date like "Jun 14, 2026"
    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const dateFormatted = new Date().toLocaleDateString("en-US", dateOptions);

    // Calculate approximate read time (average 200 words per minute)
    const wordCount = blogData.contentHtml.split(/\s+/).length;
    const readMinutes = Math.max(Math.round(wordCount / 200), 3); // minimum 3 mins
    const readTime = `${readMinutes} min read`;

    const finalPost = {
      slug,
      title: blogData.title,
      excerpt: blogData.excerpt,
      category: config.category,
      categoryDisplay: config.categoryDisplay,
      date: dateFormatted,
      readTime,
      color: config.color,
      author: blogData.author,
      role: blogData.role,
      intro: blogData.intro,
      toc: blogData.toc,
      contentHtml: blogData.contentHtml
    };

    // 4. Save file to filesystem
    const targetDir = path.join(process.cwd(), "src/data/blog");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(finalPost, null, 2), "utf8");

    console.log("==========================================================");
    console.log(`[SUCCESS] New AI Blog post generated: "${finalPost.title}"`);
    console.log(`Saved file: src/data/blog/${slug}.json`);
    console.log(`Category: ${finalPost.categoryDisplay} | Read time: ${finalPost.readTime}`);
    console.log("==========================================================");

  } catch (error) {
    console.error("Critical: Failed to generate AI blog post:", error);
    process.exit(1);
  }
}

generateBlog();
