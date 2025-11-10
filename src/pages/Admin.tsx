import { useState } from "react";
import { useProducts, productSchema, type ProductFormData, type Product, type ProductFormDataWithImage } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, X, Upload, Pencil } from "lucide-react";
import { categoryNames } from "@/data/products";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function Admin() {
  const { products, isLoading, addProduct, isAddingProduct, updateAvailability, updateProduct, isUpdatingProduct } = useProducts();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "queijo",
    weight: "",
    available: true,
    best_seller: false,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estado para edição
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<ProductFormDataWithImage | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrors({ ...errors, image: "Formato inválido. Use JPG, PNG ou WEBP." });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors({ ...errors, image: "Imagem deve ter no máximo 5MB." });
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors({ ...errors, image: "" });
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const validateForm = (): boolean => {
    try {
      productSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    addProduct({ productData: formData, imageFile: imageFile || undefined }, {
      onSuccess: () => {
        setFormData({
          name: "",
          description: "",
          price: 0,
          category: "queijo",
          weight: "",
          available: true,
          best_seller: false,
        });
        removeImage();
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category as "queijo" | "variados" | "doces",
      weight: product.weight || "",
      available: product.available,
      best_seller: product.best_seller || false,
      image_url: product.image_url,
    });
    setEditImagePreview(product.image_url || "");
    setEditImageFile(null);
    setEditErrors({});
  };

  const closeEditDialog = () => {
    setEditingProduct(null);
    setEditFormData(null);
    setEditImageFile(null);
    setEditImagePreview("");
    setEditErrors({});
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setEditErrors({ ...editErrors, image: "Formato inválido. Use JPG, PNG ou WEBP." });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setEditErrors({ ...editErrors, image: "Imagem deve ter no máximo 5MB." });
      return;
    }

    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
    setEditErrors({ ...editErrors, image: "" });
  };

  const removeEditImage = () => {
    setEditImageFile(null);
    setEditImagePreview("");
    if (editFormData) {
      setEditFormData({ ...editFormData, image_url: null });
    }
  };

  const validateEditForm = (): boolean => {
    if (!editFormData) return false;
    try {
      productSchema.parse(editFormData);
      setEditErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setEditErrors(fieldErrors);
      return false;
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEditForm() || !editingProduct || !editFormData) return;

    updateProduct({ 
      id: editingProduct.id, 
      productData: editFormData, 
      imageFile: editImageFile || undefined,
      currentImageUrl: editingProduct.image_url
    }, {
      onSuccess: () => {
        closeEditDialog();
      },
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-secondary">Administração de Produtos</h1>

        {/* Formulário de Adição */}
        <form onSubmit={handleSubmit} className="mb-12 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-foreground">Adicionar Novo Produto</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Queijo coalho tradicional"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: "queijo" | "variados" | "doces") =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="queijo">{categoryNames.queijo}</SelectItem>
                  <SelectItem value="variados">{categoryNames.variados}</SelectItem>
                  <SelectItem value="doces">{categoryNames.doces}</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Peso/Quantidade</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Ex: 500g, 1kg"
              />
              {errors.weight && <p className="text-sm text-destructive">{errors.weight}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do produto..."
                rows={3}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">Imagem do Produto</Label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="image"
                    className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <Input
                      id="image"
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="text-sm text-muted-foreground">
                  JPG, PNG ou WEBP (máx. 5MB)
                </p>
              </div>
              {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
              />
              <Label htmlFor="available">Produto disponível</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="best_seller"
                checked={formData.best_seller}
                onCheckedChange={(checked) => setFormData({ ...formData, best_seller: checked })}
              />
              <Label htmlFor="best_seller">Produto mais vendido</Label>
            </div>
          </div>

          <Button type="submit" disabled={isAddingProduct} className="mt-6">
            {isAddingProduct && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Adicionar Produto
          </Button>
        </form>

        {/* Tabela de Produtos */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Produtos Cadastrados</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                Nenhum produto cadastrado ainda.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Disponível</TableHead>
                    <TableHead>Mais Vendido</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className={!product.available ? "opacity-50" : ""}>
                      <TableCell>
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-12 w-12 rounded object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded bg-muted" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{categoryNames[product.category]}</TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>
                        <Switch
                          checked={product.available}
                          onCheckedChange={(checked) =>
                            updateAvailability({ id: product.id, available: checked })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {product.best_seller ? (
                          <span className="text-sm font-medium text-primary">⭐ Sim</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Não</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        {/* Dialog de Edição */}
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && closeEditDialog()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
            </DialogHeader>
            
            {editFormData && (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nome *</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      placeholder="Ex: Queijo coalho tradicional"
                    />
                    {editErrors.name && <p className="text-sm text-destructive">{editErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Preço (R$) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={editFormData.price || ""}
                      onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                    />
                    {editErrors.price && <p className="text-sm text-destructive">{editErrors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Categoria *</Label>
                    <Select
                      value={editFormData.category}
                      onValueChange={(value: "queijo" | "variados" | "doces") =>
                        setEditFormData({ ...editFormData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="queijo">{categoryNames.queijo}</SelectItem>
                        <SelectItem value="variados">{categoryNames.variados}</SelectItem>
                        <SelectItem value="doces">{categoryNames.doces}</SelectItem>
                      </SelectContent>
                    </Select>
                    {editErrors.category && <p className="text-sm text-destructive">{editErrors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-weight">Peso/Quantidade</Label>
                    <Input
                      id="edit-weight"
                      value={editFormData.weight}
                      onChange={(e) => setEditFormData({ ...editFormData, weight: e.target.value })}
                      placeholder="Ex: 500g, 1kg"
                    />
                    {editErrors.weight && <p className="text-sm text-destructive">{editErrors.weight}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="edit-description">Descrição</Label>
                    <Textarea
                      id="edit-description"
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      placeholder="Descrição do produto..."
                      rows={3}
                    />
                    {editErrors.description && <p className="text-sm text-destructive">{editErrors.description}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="edit-image">Imagem do Produto</Label>
                    <div className="flex items-center gap-4">
                      {editImagePreview ? (
                        <div className="relative">
                          <img
                            src={editImagePreview}
                            alt="Preview"
                            className="h-24 w-24 rounded-md object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -right-2 -top-2 h-6 w-6"
                            onClick={removeEditImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor="edit-image"
                          className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary"
                        >
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <Input
                            id="edit-image"
                            type="file"
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            onChange={handleEditImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG ou WEBP (máx. 5MB)
                      </p>
                    </div>
                    {editErrors.image && <p className="text-sm text-destructive">{editErrors.image}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-available"
                      checked={editFormData.available}
                      onCheckedChange={(checked) => setEditFormData({ ...editFormData, available: checked })}
                    />
                    <Label htmlFor="edit-available">Produto disponível</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-best-seller"
                      checked={editFormData.best_seller || false}
                      onCheckedChange={(checked) => setEditFormData({ ...editFormData, best_seller: checked })}
                    />
                    <Label htmlFor="edit-best-seller">Produto mais vendido</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={closeEditDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isUpdatingProduct}>
                    {isUpdatingProduct && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
