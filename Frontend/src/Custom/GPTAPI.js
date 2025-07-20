const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "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";

export default async function getDeepSeekResponseStream(prompt, onData, onDone) {
  if (!API_KEY) throw new Error("API key is missing.");

  let retries = 3;
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  while (retries > 0) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "MyReactApp"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        stream: true,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (response.status === 429) {
      retries--;
      console.warn("🕒 Rate limit hit. Retrying in 3s...");
      await wait(3000);
      continue;
    }

    if (!response.ok || !response.body) {
      throw new Error(`OpenRouter error: ${response.status} ${response.statusText}`);
    }

    // Process stream as you already do
    // ...
    return; // success path
  }

  throw new Error("Too many requests. Please try again later.");
}
