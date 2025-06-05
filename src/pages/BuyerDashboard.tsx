import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Heart, Store, User, History, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
  sellerName: string;
  available: boolean;
}

const BuyerDashboard = () => {
  const { user, logout } = useAuth();
  const { getTotalItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock products data with proper UUID format
    const mockProducts: Product[] = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Fresh Vegetables Bundle',
        description: 'Fresh seasonal vegetables from local farms',
        price: 150,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300',
        category: 'vegetables',
        sellerId: '550e8400-e29b-41d4-a716-446655440101',
        sellerName: 'Ram\'s Vegetable Shop',
        available: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Rice (5kg)',
        description: 'Premium quality basmati rice',
        price: 400,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
        category: 'grains',
        sellerId: '550e8400-e29b-41d4-a716-446655440102',
        sellerName: 'Shyam Grocery Store',
        available: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Fresh Milk (1L)',
        description: 'Pure cow milk from local dairy',
        price: 60,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300',
        category: 'dairy',
        sellerId: '550e8400-e29b-41d4-a716-446655440103',
        sellerName: 'Village Dairy',
        available: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Wheat Flour (10kg)',
        description: 'Fresh ground wheat flour',
        price: 350,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300',
        category: 'grains',
        sellerId: '550e8400-e29b-41d4-a716-446655440101',
        sellerName: 'Ram\'s Vegetable Shop',
        available: true
      }
    ];
    setProducts(mockProducts);
  }, []);

  const categories = ['all', 'vegetables', 'grains', 'dairy', 'spices'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.available;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: product.sellerId
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-village-green mr-2" />
              <h1 className="text-xl font-bold text-gray-900">ग्रामुक दुकानदार</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-village-orange text-white">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="ghost" size="sm">
                  <History className="h-5 w-5 mr-1" />
                  Orders
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Discover fresh products from local village shops</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="text-sm">{product.description}</CardDescription>
                <p className="text-xs text-gray-500">{product.sellerName}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-village-green">
                    ₹{product.price}
                  </span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-village-green hover:bg-green-600"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
