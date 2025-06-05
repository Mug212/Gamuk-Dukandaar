
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star } from 'lucide-react';
import { toast } from 'sonner';

interface SubscriptionPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: 'free' | 'premium' | 'enterprise';
  onPlanChange: (plan: 'free' | 'premium' | 'enterprise') => void;
}

const SubscriptionPlanDialog = ({ isOpen, onClose, currentPlan, onPlanChange }: SubscriptionPlanDialogProps) => {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      price: '₹0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Up to 10 products',
        'Basic analytics',
        'Standard support',
        'Cash on Delivery only'
      ],
      icon: Star,
      popular: false
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '₹299',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        'Unlimited products',
        'Advanced analytics',
        'Priority support',
        'All payment methods (UPI, Online)',
        'Custom product categories',
        'Bulk order management',
        'Sales reports'
      ],
      icon: Crown,
      popular: true
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      price: '₹999',
      period: '/month',
      description: 'For large scale operations',
      features: [
        'Everything in Premium',
        'Multi-store management',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
        'Advanced reporting'
      ],
      icon: Crown,
      popular: false
    }
  ];

  const handleUpgrade = () => {
    if (selectedPlan === currentPlan) {
      toast.info('You are already on this plan');
      return;
    }

    onPlanChange(selectedPlan);
    toast.success(`Successfully upgraded to ${plans.find(p => p.id === selectedPlan)?.name} plan!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
          <DialogDescription>
            Unlock premium features to grow your business
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-village-green' 
                    : 'hover:shadow-lg'
                } ${plan.popular ? 'border-village-green' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-village-green">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="h-8 w-8 text-village-green" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-village-green">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {currentPlan === plan.id && (
                    <Badge variant="secondary" className="w-full mt-4 justify-center">
                      Current Plan
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="flex gap-2 mt-6">
          <Button 
            onClick={handleUpgrade} 
            className="flex-1 bg-village-green hover:bg-green-600"
            disabled={selectedPlan === currentPlan}
          >
            {selectedPlan === currentPlan ? 'Current Plan' : `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name}`}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPlanDialog;
