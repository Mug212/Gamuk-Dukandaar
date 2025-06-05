
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  sellerId: string;
}

interface EditProductDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditProductDialog = ({ product, isOpen, onClose, onSave }: EditProductDialogProps) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    category: product.category,
    image: product.image
  });

  const handleSave = () => {
    if (!editedProduct.name || !editedProduct.price || !editedProduct.category) {
      toast.error('Please fill all required fields');
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name: editedProduct.name,
      description: editedProduct.description,
      price: parseFloat(editedProduct.price),
      category: editedProduct.category,
      image: editedProduct.image
    };

    onSave(updatedProduct);
    onClose();
    toast.success('Product updated successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update your product details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Product Name</Label>
            <Input
              id="edit-name"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editedProduct.description}
              onChange={(e) => setEditedProduct(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter product description"
            />
          </div>
          <div>
            <Label htmlFor="edit-price">Price (₹)</Label>
            <Input
              id="edit-price"
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Enter price"
            />
          </div>
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Select
              value={editedProduct.category}
              onValueChange={(value) => setEditedProduct(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="spices">Spices</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="edit-image">Image URL</Label>
            <Input
              id="edit-image"
              value={editedProduct.image}
              onChange={(e) => setEditedProduct(prev => ({ ...prev, image: e.target.value }))}
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1 bg-village-green hover:bg-green-600">
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
