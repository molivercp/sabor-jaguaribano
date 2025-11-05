-- Criar enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Criar tabela de roles de usuários
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Habilitar RLS na tabela user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Política para admins visualizarem todas as roles
CREATE POLICY "Admins podem ver todas as roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Criar função security definer para verificar role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Atualizar políticas RLS de produtos
DROP POLICY IF EXISTS "Admin pode ver todos os produtos" ON public.products;
DROP POLICY IF EXISTS "Produtos disponíveis são visíveis publicamente" ON public.products;
DROP POLICY IF EXISTS "Qualquer um pode atualizar produtos" ON public.products;
DROP POLICY IF EXISTS "Qualquer um pode deletar produtos" ON public.products;
DROP POLICY IF EXISTS "Qualquer um pode inserir produtos" ON public.products;

-- Qualquer um pode ver produtos disponíveis
CREATE POLICY "Produtos disponíveis visíveis publicamente"
ON public.products
FOR SELECT
USING (available = true OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin')));

-- Apenas admins podem inserir produtos
CREATE POLICY "Apenas admins podem inserir produtos"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Apenas admins podem atualizar produtos
CREATE POLICY "Apenas admins podem atualizar produtos"
ON public.products
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Apenas admins podem deletar produtos
CREATE POLICY "Apenas admins podem deletar produtos"
ON public.products
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Inserir produtos iniciais (sem imagens por enquanto, podem ser adicionadas depois pelo admin)
INSERT INTO public.products (name, price, category, weight, available, description) VALUES
-- Queijo Coalho 950g-1kg
('Queijo coalho tradicional', 32.99, 'queijo', '950g a 1kg', true, NULL),
('Queijo com orégano', 39.99, 'queijo', '950g a 1kg', true, NULL),
('Queijo com ervas finas e pimenta calabresa', 39.99, 'queijo', '950g a 1kg', true, NULL),
('Queijo com chimichurri', 39.99, 'queijo', '950g a 1kg', true, NULL),
('Queijo com pimenta biquinho', 39.99, 'queijo', '950g a 1kg', true, NULL),
('Queijo com carne de sol', 39.99, 'queijo', '950g a 1kg', true, NULL),
-- Queijo Coalho 500g
('Queijo coalho tradicional', 16.5, 'queijo', '500g', true, NULL),
('Queijo com orégano', 19.99, 'queijo', '500g', true, NULL),
('Queijo com ervas finas e pimenta calabresa', 19.99, 'queijo', '500g', true, NULL),
('Queijo com pimenta biquinho', 19.99, 'queijo', '500g', true, NULL),
('Queijo com chimichurri', 19.99, 'queijo', '500g', true, NULL),
('Queijo com carne de sol', 19.99, 'queijo', '500g', true, NULL),
-- Produtos Variados
('Queijo manteiga', 20.99, 'variados', '500g', true, NULL),
('Creme de nata', 11.99, 'variados', 'pote 500g', true, NULL),
('Macaxeira', 11.99, 'variados', 'pacote 1kg', true, NULL),
('Galinha caipira', 54.99, 'variados', '1,3kg a 1,5kg', true, NULL),
('Carne de carneiro', 28.99, 'variados', 'a partir de 2kg', true, NULL),
('Carne de sol', 44.99, 'variados', '1kg', true, NULL),
('Buchada', 44.99, 'variados', '1 unidade', true, NULL),
('Filé de tilápia', 31.99, 'variados', '1kg', true, NULL),
('Farofa da Vovó', 17.99, 'variados', 'pote 500g', true, NULL),
('Farofa da Vovó', 11.99, 'variados', 'pote 250g', true, NULL),
('Castanha caseira torrada', 15.49, 'variados', '250g', true, NULL),
('Castanha caseira torrada', 30.99, 'variados', '500g', true, NULL),
('Manteiga da terra', 17.5, 'variados', '500ml', true, NULL),
('Manteiga da terra', 34.99, 'variados', '1 litro', true, NULL),
('Mel de abelha italiana puro', 17.5, 'variados', '500ml', true, NULL),
('Mel de abelha italiana puro', 34.99, 'variados', '1 litro', true, NULL),
-- Doces Caseiros
('Doce de leite cremoso', 14.99, 'doces', 'pote 600g', true, NULL),
('Doce de leite caroçudo', 14.99, 'doces', 'pote 600g', true, NULL),
('Doce de leite com goiabada', 14.99, 'doces', 'pote 600g', true, NULL),
('Doce de banana', 14.99, 'doces', 'pote 600g', true, NULL),
('Doce de mamão com coco', 14.99, 'doces', 'pote 600g', true, NULL),
('Doce de goiaba cremoso', 14.99, 'doces', 'pote 600g', true, NULL);