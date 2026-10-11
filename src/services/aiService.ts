import { getApiConfig, simulateNetworkDelay } from "./apiConfig";

export interface ChatMessageContext {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateAiResponse(
  prompt: string,
  history: ChatMessageContext[] = [],
  systemPrompt = "You are PulseBot, a helpful AI assistant for the Shared-UI design system workspace."
): Promise<string> {
  const config = getApiConfig();

  // If live OpenAI key is configured
  if (!config.isMockMode && config.openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: prompt },
          ],
        }),
      });
      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (err) {
      console.warn("Live OpenAI API failed, falling back to simulated engine:", err);
    }
  }

  // Simulated AI Engine with intelligent contextual knowledge of Shared-UI
  await simulateNetworkDelay(600, 1200);

  const lower = prompt.toLowerCase();
  if (lower.includes("spotlight") || lower.includes("radial")) {
    return "The Spotlight component utilizes Framer Motion's `useMotionTemplate` to track cursor coordinates without triggering React re-renders. It projects a soft radial gradient with specular boundary highlights!";
  }
  if (lower.includes("3d") || lower.includes("tilt") || lower.includes("perspective")) {
    return "Our ThreeDCard component leverages hardware-accelerated CSS `transform-style: preserve-3d` and dynamic trigonometric offsets. You can configure individual Z-depths using `<CardItem translateZ={60}>`.";
  }
  if (lower.includes("deploy") || lower.includes("build") || lower.includes("release")) {
    return "Deployment status: Build passed in 1.70s. Production static artifacts are ready in `/dist`. All 8 demo sites passed end-to-end component telemetry checks.";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("pricing")) {
    return "We offer Starter ($29/mo), Growth ($89/mo), and Enterprise ($249/mo) plans. You can also slide the ROI calculator in the Business demo to project exact team cost savings!";
  }
  if (lower.includes("menu") || lower.includes("food") || lower.includes("tasting")) {
    return "L'Atelier Noir features our 7-sequence Autumn Degustation pairing wild morels, Miyazaki Wagyu, and Grand Cru vintages. You can reserve directly from the Restaurant demo.";
  }

  const defaultReplies = [
    `Acknowledged: "${prompt}". All client physics springs are operating at nominal 120Hz refresh rates. Let me know if you need code snippets or architecture guidance.`,
    `Great question regarding "${prompt}". Shared-UI components are modularly decoupled, meaning you can drop them into Next.js, Remix, Vite, or Astro with zero SSR hydration friction.`,
    `Processed request for "${prompt}". Our multi-style theme engine automatically updates design tokens across Obsidian, Champagne, Indigo, Emerald, and Rose palettes!`,
  ];

  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}
