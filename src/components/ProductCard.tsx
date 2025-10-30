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

  return (
    <Card className="group overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
      {/* Product Image */}
      {product.image && (
        <div className="relative h-64 w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      
      <CardContent className="p-6">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        {product.weight && (
          <p className="mb-3 text-sm text-muted-foreground">{product.weight}</p>
        )}
        <p className="text-2xl font-bold text-primary">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <ShoppingCart className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">
            Adicionar ao Carrinho
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
