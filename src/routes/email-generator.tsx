import { createFileRoute } from "@tanstack/react-router";
import { EmailGenerator } from "@/components/workplace/generators";
export const Route = createFileRoute("/email-generator")({
  validateSearch: (search: Record<string, unknown>): { example?: boolean } => ({
    example: search['example'] === true || search['example'] === "true",
  }),
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in Formal, Friendly, and Persuasive tones with simulated assistance.",
      },
      { property: "og:title", content: "Smart Email Generator | Workplace AI" },
      {
        property: "og:description",
        content:
          "Draft professional workplace emails in Formal, Friendly, and Persuasive tones with simulated assistance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { example } = Route.useSearch();
  return <EmailGenerator example={example} />;
}
