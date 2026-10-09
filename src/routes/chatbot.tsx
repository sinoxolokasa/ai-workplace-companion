import { createFileRoute } from "@tanstack/react-router";
import { WorkplaceChat } from "@/components/workplace/chat";
export const Route = createFileRoute("/chatbot")({
  validateSearch: (search: Record<string, unknown>): { example?: boolean } => ({
    example: search['example'] === true || search['example'] === "true",
  }),
  head: () => ({
    meta: [
      { title: "AI Chatbot | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content: "Work through workplace ideas in a private, session-only simulated conversation.",
      },
      { property: "og:title", content: "AI Chatbot | Workplace AI" },
      {
        property: "og:description",
        content: "Work through workplace ideas in a private, session-only simulated conversation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { example } = Route.useSearch();
  return <WorkplaceChat example={example} />;
}
