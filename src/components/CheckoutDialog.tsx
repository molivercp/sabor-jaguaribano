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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { z } from "zod";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const baseSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(15, "Telefone inválido"),
});

const addressSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(15, "Telefone inválido"),
  street: z.string().trim().min(5, "Endereço deve ter no mínimo 5 caracteres").max(200, "Endereço muito longo"),
  number: z.string().trim().min(1, "Número é obrigatório").max(10, "Número muito longo"),
  complement: z.string().trim().max(100, "Complemento muito longo").optional(),
  neighborhood: z.string().trim().min(3, "Bairro deve ter no mínimo 3 caracteres").max(100, "Bairro muito longo"),
  city: z.string().trim().min(3, "Cidade é obrigatória").max(100, "Cidade muito longa"),
});

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { cart, getTotal, getShippingFee, getTotalWithShipping, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<string>("loja");
  const [paymentMethod, setPaymentMethod] = useState<string>("dinheiro");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "Fortaleza",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Carrinho vazio");
      return;
    }

    // Validação do formulário
    try {
      if (deliveryMethod === "loja") {
        addressSchema.parse(formData);
      } else {
        baseSchema.parse(formData);
      }
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
    }

    // Formata a mensagem para WhatsApp
    let message = "*Pedido - Sabor Jaguaribano*\n\n";
    
    message += "*Dados do Cliente:*\n";
    message += `Nome: ${formData.name}\n`;
    message += `Telefone: ${formData.phone}\n`;
    
    const deliveryLabels: Record<string, string> = {
      loja: "Entrega pela loja",
      retirada: "Retirada na loja",
      uber: "Uber Flash",
    };
    
    message += `\n*Método de Entrega:* ${deliveryLabels[deliveryMethod]}\n`;
    
    if (deliveryMethod === "loja") {
      message += `Endereço: ${formData.street}, ${formData.number}`;
      if (formData.complement) {
        message += ` - ${formData.complement}`;
      }
      message += `\n`;
      message += `Bairro: ${formData.neighborhood}\n`;
      message += `Cidade: ${formData.city}\n`;
    }
    message += `\n`;
    
    message += "*Itens:*\n";
    
    cart.forEach((item) => {
      message += `• ${item.name}`;
      if (item.weight) {
        message += ` (${item.weight})`;
      }
      message += `\n  ${item.quantity}x R$ ${item.price.toFixed(2).replace(".", ",")}`;
      message += ` = R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}\n`;
    });

    const shippingFee = getShippingFee(deliveryMethod);
    message += `\n*Subtotal:* R$ ${getTotal().toFixed(2).replace(".", ",")}\n`;
    
    if (deliveryMethod === "loja") {
      if (shippingFee > 0) {
        message += `*Taxa de Entrega:* R$ ${shippingFee.toFixed(2).replace(".", ",")}\n`;
      } else {
        message += `*Taxa de Entrega:* Grátis (compra acima de R$ 100,00)\n`;
      }
    }
    
    message += `*Total:* R$ ${getTotalWithShipping(deliveryMethod).toFixed(2).replace(".", ",")}\n\n`;
    
    const paymentLabels: Record<string, string> = {
      dinheiro: "Dinheiro",
      pix: "PIX",
      cartao: "Cartão na entrega",
    };
    
    message += `*Forma de pagamento:* ${paymentLabels[paymentMethod]}\n`;
    
    if (deliveryMethod === "retirada") {
      message += `\n_Retirada na loja. Pagamento no ato da retirada._`;
    } else if (deliveryMethod === "uber") {
      message += `\n_Entrega por Uber Flash. Pagamento do frete direto ao motorista._`;
    } else {
      message += `\n_Pagamento será feito no ato da entrega._`;
    }

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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Preencha seus dados para entrega e escolha a forma de pagamento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Método de Entrega */}
          <div className="space-y-2">
            <Label>Método de Entrega</Label>
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="loja" id="loja" />
                <Label htmlFor="loja" className="cursor-pointer">
                  Entrega pela loja
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="retirada" id="retirada" />
                <Label htmlFor="retirada" className="cursor-pointer">
                  Retirada na loja
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="uber" id="uber" />
                <Label htmlFor="uber" className="cursor-pointer">
                  Uber Flash
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Dados do Cliente */}
          <div className="space-y-3 border-t pt-4">
            <h3 className="font-semibold text-sm">Dados para Contato</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone/WhatsApp *</Label>
              <Input
                id="phone"
                placeholder="(85) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>

            {deliveryMethod === "loja" && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="street">Rua/Avenida *</Label>
                    <Input
                      id="street"
                      placeholder="Nome da rua"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className={errors.street ? "border-destructive" : ""}
                    />
                    {errors.street && (
                      <p className="text-xs text-destructive">{errors.street}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Número *</Label>
                    <Input
                      id="number"
                      placeholder="123"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className={errors.number ? "border-destructive" : ""}
                    />
                    {errors.number && (
                      <p className="text-xs text-destructive">{errors.number}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    placeholder="Apt, bloco, casa..."
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      placeholder="Seu bairro"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className={errors.neighborhood ? "border-destructive" : ""}
                    />
                    {errors.neighborhood && (
                      <p className="text-xs text-destructive">{errors.neighborhood}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-xs text-destructive">{errors.city}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Forma de Pagamento */}
          <div className="space-y-2 pt-2 border-t">
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

          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">
              Seu pedido será enviado via WhatsApp para confirmação. 
              O pagamento será realizado no momento da entrega.
            </p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal:</span>
              <span>R$ {getTotal().toFixed(2).replace(".", ",")}</span>
            </div>
            {deliveryMethod === "loja" && (
              <div className="flex items-center justify-between text-sm">
                <span>Taxa de Entrega:</span>
                <span className={getShippingFee(deliveryMethod) === 0 ? "text-green-600" : ""}>
                  {getShippingFee(deliveryMethod) === 0 
                    ? "Grátis" 
                    : `R$ ${getShippingFee(deliveryMethod).toFixed(2).replace(".", ",")}`
                  }
                </span>
              </div>
            )}
            <div className="flex items-center justify-between border-t pt-2">
              <span className="font-semibold">Total:</span>
              <span className="text-2xl font-bold text-primary">
                R$ {getTotalWithShipping(deliveryMethod).toFixed(2).replace(".", ",")}
              </span>
            </div>
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
