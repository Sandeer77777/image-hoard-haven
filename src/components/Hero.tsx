export function Hero() {
  return (
    <section className="hero-section relative overflow-hidden bg-secondary px-6 py-10 text-center sm:py-20">
      <h1 className="hero-title font-display mx-auto max-w-3xl text-[2.75rem] font-bold leading-[1.1] text-foreground sm:text-6xl">
        Vista a camisa do seu time
      </h1>
      <p className="hero-sub mx-auto mt-4 max-w-lg text-[15px] font-normal leading-relaxed text-muted-foreground">
        Camisas retrô e atuais dos maiores clubes. Escolha a sua e faça seu pedido pelo WhatsApp.
      </p>
      <a href="#catalogo" className="btn-gold btn-hero mt-8">
        Ver catálogo
      </a>
    </section>
  );
}
