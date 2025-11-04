-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
  category TEXT NOT NULL CHECK (category IN ('queijo', 'variados', 'doces')),
  weight TEXT,
  image_url TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_available ON public.products(available);

-- Habilitar RLS na tabela products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública de produtos disponíveis
CREATE POLICY "Produtos disponíveis são visíveis publicamente"
  ON public.products
  FOR SELECT
  USING (available = true);

-- Política para leitura de todos os produtos (para admin)
CREATE POLICY "Admin pode ver todos os produtos"
  ON public.products
  FOR SELECT
  USING (true);

-- Política para inserção (por enquanto aberta, pode adicionar auth depois)
CREATE POLICY "Qualquer um pode inserir produtos"
  ON public.products
  FOR INSERT
  WITH CHECK (true);

-- Política para atualização
CREATE POLICY "Qualquer um pode atualizar produtos"
  ON public.products
  FOR UPDATE
  USING (true);

-- Política para deleção
CREATE POLICY "Qualquer um pode deletar produtos"
  ON public.products
  FOR DELETE
  USING (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Criar bucket para imagens de produtos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir leitura pública das imagens
CREATE POLICY "Imagens de produtos são públicas"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- Política para permitir upload de imagens
CREATE POLICY "Qualquer um pode fazer upload de imagens de produtos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

-- Política para permitir atualização de imagens
CREATE POLICY "Qualquer um pode atualizar imagens de produtos"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'product-images');

-- Política para permitir deleção de imagens
CREATE POLICY "Qualquer um pode deletar imagens de produtos"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'product-images');