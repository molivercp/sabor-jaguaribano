import { products, categoryNames } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductSection() {
  const categories = ["queijo", "variados", "doces"] as const;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {categories.map((category) => {
          const categoryProducts = products.filter((p) => p.category === category);
          
          return (
            <div key={category} className="mb-16" id={category}>
              <h2 className="mb-8 text-center text-4xl font-bold text-secondary">
                {categoryNames[category]}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
