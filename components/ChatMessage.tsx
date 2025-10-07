export default function ChatMessage({ role, content }: { role: string, content: string }) {
  return <div className={role==='user'?'text-blue-500':'text-gray-700'}><b>{role}:</b> {content}</div>;
}