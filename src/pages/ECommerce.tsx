import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, Star, Search, Filter, Package, TrendingUp, Users, DollarSign, Heart, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ECommerce = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      stock: 15,
      sale: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      category: 'Electronics',
      description: 'Track your fitness goals with this advanced smartwatch',
      stock: 8,
      sale: false
    },
    {
      id: 3,
      name: 'Premium Coffee Beans',
      price: 24.99,
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
      category: 'Food',
      description: 'Organic, single-origin coffee beans from Ethiopia',
      stock: 25,
      sale: false
    },
    {
      id: 4,
      name: 'Ergonomic Office Chair',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      category: 'Furniture',
      description: 'Comfortable office chair with lumbar support',
      stock: 5,
      sale: true
    },
    {
      id: 5,
      name: 'Vintage Leather Backpack',
      price: 89.99,
      rating: 4.4,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      category: 'Fashion',
      description: 'Handcrafted leather backpack with vintage design',
      stock: 12,
      sale: false
    },
    {
      id: 6,
      name: 'Yoga Mat Pro',
      price: 49.99,
      rating: 4.9,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
      category: 'Sports',
      description: 'Professional yoga mat with excellent grip',
      stock: 20,
      sale: false
    }
  ];

  const categories = ['All', 'Electronics', 'Fashion', 'Food', 'Furniture', 'Sports'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({
        title: "Removed from Wishlist",
        description: "Item removed from your wishlist.",
      });
    } else {
      setWishlist([...wishlist, productId]);
      toast({
        title: "Added to Wishlist",
        description: "Item added to your wishlist.",
      });
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">TechMart</h1>
                <p className="text-sm text-muted-foreground">Your one-stop e-commerce solution</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart ({getTotalItems()})
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Shopping Cart</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">${item.price}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total: ${getTotalPrice().toFixed(2)}</span>
                            <Button>Checkout</Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={() => navigate('/')}>
                ← Back to Portfolio
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="py-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500">12K+</div>
              <div className="text-sm text-muted-foreground">Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-500">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-500">$2M+</div>
              <div className="text-sm text-muted-foreground">Sales</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.sale && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Sale
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                    <span className="ml-1 text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} in stock
                  </span>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ECommerce;