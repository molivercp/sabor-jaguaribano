import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { cart, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("dinheiro");

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Carrinho vazio");
      return;
    }

    // Formata a mensagem para WhatsApp
    let message = "*Pedido - Sabor Jaguaribano*\n\n";
    message += "*Itens:*\n";
    
    cart.forEach((item) => {
      message += `• ${item.name}`;
      if (item.weight) {
        message += ` (${item.weight})`;
      }
      message += `\n  ${item.quantity}x R$ ${item.price.toFixed(2).replace(".", ",")}`;
      message += ` = R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}\n`;
    });

    message += `\n*Total:* R$ ${getTotal().toFixed(2).replace(".", ",")}\n\n`;
    
    const paymentLabels: Record<string, string> = {
      dinheiro: "Dinheiro",
      pix: "PIX",
      cartao: "Cartão na entrega",
    };
    
    message += `*Forma de pagamento:* ${paymentLabels[paymentMethod]}\n`;
    message += `\n_Pagamento será feito no ato da entrega_`;

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5585998627951"; // Número do WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(whatsappUrl, "_blank");

    // Limpa o carrinho e fecha o dialog
    clearCart();
    onOpenChange(false);
    toast.success("Pedido enviado! Aguarde o contato.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Escolha a forma de pagamento. O pagamento será feito no ato da entrega.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Forma de Pagamento</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dinheiro" id="dinheiro" />
                <Label htmlFor="dinheiro" className="cursor-pointer">
                  Dinheiro
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix" className="cursor-pointer">
                  PIX
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cartao" id="cartao" />
                <Label htmlFor="cartao" className="cursor-pointer">
                  Cartão na entrega
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Seu pedido será enviado via WhatsApp para confirmação. 
              O pagamento será realizado no momento da entrega.
            </p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              R$ {getTotal().toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          Enviar Pedido via WhatsApp
        </Button>
      </DialogContent>
    </Dialog>
  );
}
