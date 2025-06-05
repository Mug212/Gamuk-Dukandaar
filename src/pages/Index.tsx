
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Store, Truck, Shield, Users, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-cream to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-village-green mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">ग्रामुक दुकानदार</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to={user.userType === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard'}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            गांव का <span className="text-village-green">डिजिटल बाज़ार</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect village shops with customers for convenient home delivery. 
            Supporting local businesses, serving rural communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-village-green hover:bg-green-600 text-white px-8 py-3">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="px-8 py-3">
                <Store className="mr-2 h-5 w-5" />
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Gramuk Dukandaar?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 text-village-green mx-auto mb-4" />
                <CardTitle>Home Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get your daily essentials delivered right to your doorstep. 
                  Fast and reliable delivery across rural areas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-village-orange mx-auto mb-4" />
                <CardTitle>Support Local Shops</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with local village shops and support your community. 
                  Helping small businesses grow digitally.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-village-brown mx-auto mb-4" />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Safe and secure payment options with money-back guarantee. 
                  Multiple payment methods for your convenience.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-village-green text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and sellers in our growing community.
          </p>
          {!user && (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                <MapPin className="mr-2 h-5 w-5" />
                Get Started Today
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Store className="h-6 w-6 text-village-green mr-2" />
            <span className="text-lg font-semibold">ग्रामुक दुकानदार</span>
          </div>
          <p className="text-gray-400">
            Connecting villages, empowering communities. © 2024 Gramuk Dukandaar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
