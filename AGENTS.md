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
- Keep category prices and Combo 4+ rules in `src/lib/pricing.ts`, with cart quantity driving the discount in `src/lib/cart.tsx`; this keeps mixed orders, add-ons, and WhatsApp totals consistent.
- Mount the cart provider above both catalog and product routes; a cross-product Combo 4+ requires cart contents to survive navigation between pages.
