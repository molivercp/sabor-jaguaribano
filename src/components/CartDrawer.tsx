import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CheckoutDialog } from "./CheckoutDialog";
import { useState } from "react";

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">Carrinho vazio</h3>
          <p className="text-sm text-muted-foreground">
            Adicione produtos para começar seu pedido
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle>Seu Carrinho</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="rounded-lg border p-4">
              <div className="mb-3">
                <h4 className="font-semibold">{item.name}</h4>
                {item.weight && (
                  <p className="text-sm text-muted-foreground">{item.weight}</p>
                )}
                <p className="text-lg font-bold text-primary">
                  R$ {item.price.toFixed(2).replace(".", ",")}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="mb-4 flex items-center justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-primary">
            R$ {getTotal().toFixed(2).replace(".", ",")}
          </span>
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          onClick={() => setShowCheckout(true)}
        >
          Finalizar Pedido
        </Button>
      </div>

      <CheckoutDialog open={showCheckout} onOpenChange={setShowCheckout} />
    </div>
  );
}
