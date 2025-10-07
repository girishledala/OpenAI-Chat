import { buildSystemPrompt } from "@/lib/promptUtils";

export default function PersonaSelector({ onChange }: { onChange: (persona: string)=>void }) {
  return (
    <select onChange={(e) => { onChange(e.target.value); buildSystemPrompt(e.target.value) }} className="border p-1 rounded">
      <option value="code-reviewer">Code Reviewer</option>
      <option value="travel-planner">Travel Planner</option>
    </select>
  );
}