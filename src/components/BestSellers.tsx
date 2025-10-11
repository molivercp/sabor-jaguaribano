import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function BestSellers() {
  // IDs dos produtos mais vendidos: queijo coalho tradicional 1kg, doce de leite cremoso, manteiga da terra 500ml
  const bestSellerIds = ["q1", "d1", "v13"];
  
  const bestSellers = products.filter((p) => bestSellerIds.includes(p.id));

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl font-bold text-secondary">
            Mais Vendidos
          </h2>
          <p className="text-lg text-muted-foreground">
            Os favoritos dos nossos clientes
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
