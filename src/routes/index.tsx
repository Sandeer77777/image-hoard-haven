import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Catalog } from "@/components/Catalog";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mantoz Fut — Camisas de time com qualidade e estilo" },
      {
        name: "description",
        content:
          "Catálogo de camisas de time retrô e atuais dos maiores clubes do Brasil e do mundo. Monte seu pedido e envie direto no WhatsApp.",
      },
      { property: "og:title", content: "Mantoz Fut — Camisas de time com qualidade e estilo" },
      {
        property: "og:description",
        content:
          "Camisas retrô e atuais dos maiores clubes. Monte seu pedido e envie direto no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Catalog />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
