import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export function SEO({
  title = "Sabor Jaguaribano - Produtos Regionais do Ceará",
  description = "Compre os melhores produtos regionais do Ceará: queijo coalho artesanal, queijo de manteiga, mel puro, castanhas caramelizadas, manteiga da terra, doces caseiros e muito mais. Entrega em Fortaleza terças e quintas. Frete grátis acima de R$ 100.",
  keywords = "queijo coalho, queijo de manteiga, mel puro, castanha caramelizada, manteiga da terra, doce de leite, produtos regionais ceará, produtos artesanais fortaleza, queijo artesanal, comida nordestina, sabor jaguaribano",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://lovable.app",
  type = "website",
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes("Sabor Jaguaribano") ? title : `${title} | Sabor Jaguaribano`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Sabor Jaguaribano" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Sabor Jaguaribano" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
