export function buildSystemPrompt(persona: string) {
  const personas: Record<string,string> = {
    "code-reviewer": "You are a senior frontend engineer. Provide concise code reviews.",
    "travel-planner": "You are a friendly travel planner."
  };
  return personas[persona] || "You are a helpful assistant.";
}