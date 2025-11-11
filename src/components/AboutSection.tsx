export function AboutSection() {
  return (
    <section className="py-16 px-4 bg-muted/30" id="sobre" aria-labelledby="about-heading">
      <div className="container mx-auto max-w-4xl">
        <h2 id="about-heading" className="mb-8 text-center text-4xl font-bold text-secondary">
          Sobre Nós
        </h2>
        <article className="space-y-6 text-center">
          <p className="text-lg text-foreground/90 leading-relaxed">
            O <strong>Sabor Jaguaribano</strong> nasceu do amor pela cultura e tradição 
            do sertão nordestino. Trazemos para sua mesa os melhores produtos regionais 
            do Ceará, feitos com carinho e qualidade artesanal.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Nossos queijos coalho são produzidos seguindo receitas tradicionais, 
            nossos doces caseiros mantêm o sabor da infância, e nossos produtos 
            selecionados representam o melhor da culinária cearense.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Realizamos entregas em <strong>Fortaleza às terças e quintas-feiras</strong>, 
            levando até você o verdadeiro sabor do sertão com toda comodidade.
          </p>
        </article>
      </div>
    </section>
  );
}
