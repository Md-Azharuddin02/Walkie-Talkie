export default async function getDeepSeekResponseStream(
  prompt,
  onData,     
  onDone,   
  signal,   
  opts = {}   
) {
  if (!API_KEY) throw new Error("API key is missing.");

  const model = opts.model || "x-ai/grok-4-fast:free";
  const { imageUrl } = opts;

  const content = imageUrl
    ? [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: imageUrl } },
      ]
    : [{ type: "text", text: prompt }];

  const backoff = (attempt) =>
    new Promise((r) => setTimeout(r, Math.min(3000 * attempt, 8000)));

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(import.meta.env.VITE_GPT_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          typeof window !== "undefined" ? window.location.origin : "http://localhost",
        "X-Title": "walkie-talkie",
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages: [{ role: "user", content }],
      }),
      signal,
    });

    if (res.status === 429) {
      if (attempt < 3) {
        console.warn(`🕒 Rate limit (429). Retrying in ${attempt * 3}s...`);
        await backoff(attempt);
        continue;
      }
      throw new Error("Too many requests. Please try again later.");
    }

    if (!res.ok || !res.body) {
      const text = await safeReadText(res);
      throw new Error(`OpenRouter error: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; 

        for (const raw of lines) {
          const line = raw.trim();
          if (!line || !line.startsWith("data:")) continue;

          const payload = line.slice(5).trim();
          if (payload === "[DONE]") {
         
            continue;
          }

          try {
            const json = JSON.parse(payload);
            const delta = json?.choices?.[0]?.delta?.content || "";
            if (delta) onData(delta);
          } catch {
            
          }
        }
      }

      try {
        const leftover = buffer.trim();
        if (leftover && leftover.startsWith("data:")) {
          const payload = leftover.slice(5).trim();
          if (payload && payload !== "[DONE]") {
            const j = JSON.parse(payload);
            const finalText =
              (j?.choices?.[0]?.message && j.choices[0].message.content) ||
              (j?.choices?.[0]?.delta && j.choices[0].delta.content) ||
              "";
            if (finalText) onDone(finalText);
            else onDone();
          } else {
            onDone();
          }
        } else {
          onDone();
        }
      } catch {
        onDone();
      }

      return; 
    } finally {
      try { reader.releaseLock(); } catch {}
    }
  }

  throw new Error("Too many requests. Please try again later.");
}

async function safeReadText(res) {
  try { return await res.text(); } catch { return ""; }
}
