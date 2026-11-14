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

- Derive sitemap URLs from the router with required `staticData.sitemap` decisions; this keeps public page discovery current while excluding confirmation pages.
- Every content route passes its own path to the shared metadata helper; leaf-only canonicals, share URLs and WebPage data prevent pages being attributed to the homepage.
