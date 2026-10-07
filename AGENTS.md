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

- Keep product records and photo ordering in `src/data/products.ts`, referencing `.asset.json` CDN pointers for downloaded public product photos; this preserves the editable catalog while avoiding repository binaries and third-party image hotlinks.
- Keep category prices and the “Leve 4, pague 3” cheapest-base-shirt-free rule in `src/lib/pricing.ts`, applied by `src/lib/cart-store.ts`; this keeps mixed orders, add-ons, and WhatsApp totals consistent.
- Keep cart state in a shared external store subscribed through `useSyncExternalStore`; this preserves mixed-product cart contents across routes without provider/context identity failures during live-preview updates.
- Render desktop and mobile catalog filters from the same FilterGroup definition with separate radio names and a Radix dialog on mobile; this keeps combined filtering consistent and accessible.
