import { createFileRoute } from "@tanstack/react-router";
import { ResearchAssistant } from "@/components/workplace/generators";
export const Route = createFileRoute("/research-assistant")({
  validateSearch: (search: Record<string, unknown>): { example?: boolean } => ({
    example: search['example'] === true || search['example'] === "true",
  }),
  head: () => ({
    meta: [
      { title: "AI Research Assistant | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Summarise text and explore workplace topics with simulated insights and recommendations.",
      },
      { property: "og:title", content: "AI Research Assistant | Workplace AI" },
      {
        property: "og:description",
        content:
          "Summarise text and explore workplace topics with simulated insights and recommendations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { example } = Route.useSearch();
  return <ResearchAssistant example={example} />;
}
