<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep workplace tools in focused frontend components with browser-safe simulations; no server or persistent storage is used because immediate, private demo access is required.
- Each workspace section has its own TanStack file route and shares the workplace shell; this keeps navigation and direct page URLs consistent.
- Compose the simulated chatbot with AI Elements and in-memory UIMessage parts; real AI transport is intentionally absent because the app is frontend-only.
- Define visual roles in src/styles.css and reuse the shared Button for controls so the dark visual system stays consistent.
