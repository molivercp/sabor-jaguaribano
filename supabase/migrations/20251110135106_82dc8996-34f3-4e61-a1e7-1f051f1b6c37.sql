-- Adicionar campo best_seller aos produtos
ALTER TABLE public.products 
ADD COLUMN best_seller boolean NOT NULL DEFAULT false;

-- Criar índice para melhor performance
CREATE INDEX idx_products_best_seller ON public.products(best_seller) WHERE best_seller = true;