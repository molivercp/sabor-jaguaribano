import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - Produto regional artesanal do Ceará`,
    "image": product.image || "",
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "BRL",
      "availability": product.available !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Sabor Jaguaribano"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "Sabor Jaguaribano"
    }
  };

  const altText = `${product.name} - ${product.weight ? product.weight + ' - ' : ''}Produto regional artesanal do Ceará`;

  return (
    <article className="group overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 rounded-lg border bg-card" itemScope itemType="https://schema.org/Product" role="listitem">
      <script type="application/ld+json">
        {JSON.stringify(productStructuredData)}
      </script>
      {/* Product Image */}
      {product.image && (
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={altText}
            itemProp="image"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            width="400"
            height="300"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="mb-2 text-lg font-semibold text-foreground" itemProp="name">
          {product.name}
        </h3>
        {product.weight && (
          <p className="mb-3 text-sm text-muted-foreground">{product.weight}</p>
        )}
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="BRL" />
          <meta itemProp="price" content={product.price.toString()} />
          <p className="text-2xl font-bold text-primary" itemProp="price">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <ShoppingCart className="h-4 w-4 sm:mr-2" aria-hidden="true" />
          <span className="hidden sm:inline">
            Adicionar ao Carrinho
          </span>
        </Button>
      </div>
    </article>
  );
}