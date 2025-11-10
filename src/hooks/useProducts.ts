import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import type { Product as ProductType } from "@/types/product";

export const productSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z.string().trim().max(500, "Descrição deve ter no máximo 500 caracteres").optional(),
  price: z.number().positive("Preço deve ser maior que zero"),
  category: z.enum(["queijo", "variados", "doces"], {
    required_error: "Selecione uma categoria",
  }),
  weight: z.string().trim().max(50, "Peso deve ter no máximo 50 caracteres").optional(),
  available: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  weight?: string | null;
  image_url?: string | null;
  available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFormDataWithImage extends ProductFormData {
  image_url?: string | null;
}

export function useProducts() {
  const queryClient = useQueryClient();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []) as Product[];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addProductMutation = useMutation({
    mutationFn: async ({ productData, imageFile }: { productData: ProductFormData; imageFile?: File }) => {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { data, error } = await supabase
        .from("products")
        .insert([{ 
          name: productData.name,
          description: productData.description || null,
          price: productData.price,
          category: productData.category,
          weight: productData.weight || null,
          image_url: imageUrl || null,
          available: productData.available,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto adicionado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto. Tente novamente.");
    },
  });

  const updateAvailabilityMutation = useMutation({
    mutationFn: async ({ id, available }: { id: string; available: boolean }) => {
      const { error } = await supabase
        .from("products")
        .update({ available })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Disponibilidade atualizada!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar disponibilidade:", error);
      toast.error("Erro ao atualizar disponibilidade.");
    },
  });

  const deleteImage = async (imageUrl: string) => {
    try {
      const path = imageUrl.split('/product-images/')[1];
      if (path) {
        await supabase.storage.from('product-images').remove([path]);
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
    }
  };

  const updateProductMutation = useMutation({
    mutationFn: async ({ 
      id, 
      productData, 
      imageFile,
      currentImageUrl
    }: { 
      id: string; 
      productData: ProductFormDataWithImage; 
      imageFile?: File;
      currentImageUrl?: string | null;
    }) => {
      let imageUrl = productData.image_url;

      // Se há um novo arquivo, deletar a imagem antiga e fazer upload da nova
      if (imageFile) {
        if (currentImageUrl) {
          await deleteImage(currentImageUrl);
        }
        imageUrl = await uploadImage(imageFile);
      } else if (productData.image_url === null && currentImageUrl) {
        // Se a imagem foi removida (sem substituição), deletar do storage
        await deleteImage(currentImageUrl);
        imageUrl = null;
      }

      const { data, error } = await supabase
        .from("products")
        .update({ 
          name: productData.name,
          description: productData.description || null,
          price: productData.price,
          category: productData.category,
          weight: productData.weight || null,
          image_url: imageUrl || null,
          available: productData.available,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto atualizado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Erro ao atualizar produto. Tente novamente.");
    },
  });

  return {
    products: products || [],
    isLoading,
    error,
    addProduct: addProductMutation.mutate,
    isAddingProduct: addProductMutation.isPending,
    updateAvailability: updateAvailabilityMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    isUpdatingProduct: updateProductMutation.isPending,
  };
}
