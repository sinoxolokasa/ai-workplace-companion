import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/workplace/dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Your focused workspace for professional emails, research summaries, and workplace conversations. No sign-up required.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Three helpful workplace tools in one private, simulated workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
