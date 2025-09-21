import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Plus, Trash2, Edit, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  type: 'bank_account' | 'credit_card' | 'paypal' | 'stripe' | 'wire_transfer';
  name: string;
  details: string;
  isActive: boolean;
  created_at: string;
}

const PaymentMethodsManager = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'stripe',
      name: 'Stripe Payments',
      details: 'sk_live_****1234',
      isActive: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal Business',
      details: 'business@mathinmotion.com',
      isActive: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      type: 'bank_account',
      name: 'Bank Transfer',
      details: 'Account ending in 1234',
      isActive: false,
      created_at: new Date().toISOString()
    }
  ]);

  const [newMethod, setNewMethod] = useState({
    type: 'stripe' as PaymentMethod['type'],
    name: '',
    details: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const paymentTypeLabels = {
    bank_account: 'Bank Account',
    credit_card: 'Credit Card',
    paypal: 'PayPal',
    stripe: 'Stripe',
    wire_transfer: 'Wire Transfer'
  };

  const paymentTypeColors = {
    bank_account: 'bg-blue-100 text-blue-800',
    credit_card: 'bg-green-100 text-green-800',
    paypal: 'bg-yellow-100 text-yellow-800',
    stripe: 'bg-purple-100 text-purple-800',
    wire_transfer: 'bg-gray-100 text-gray-800'
  };

  const handleAddMethod = () => {
    if (!newMethod.name.trim() || !newMethod.details.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const method: PaymentMethod = {
      id: Date.now().toString(),
      ...newMethod,
      isActive: true,
      created_at: new Date().toISOString()
    };

    setPaymentMethods(prev => [...prev, method]);
    setNewMethod({ type: 'stripe', name: '', details: '' });
    
    toast({
      title: "Payment Method Added",
      description: "New payment method has been added successfully",
    });
  };

  const handleToggleActive = (id: string) => {
    setPaymentMethods(prev => prev.map(method => 
      method.id === id ? { ...method, isActive: !method.isActive } : method
    ));
    
    toast({
      title: "Status Updated",
      description: "Payment method status updated",
    });
  };

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    
    toast({
      title: "Payment Method Deleted",
      description: "Payment method has been removed",
    });
  };

  const getActiveMethodsCount = () => {
    return paymentMethods.filter(method => method.isActive).length;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{paymentMethods.length}</div>
            <p className="text-xs text-muted-foreground">Total Methods</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{getActiveMethodsCount()}</div>
            <p className="text-xs text-muted-foreground">Active Methods</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Object.keys(paymentTypeLabels).length}
            </div>
            <p className="text-xs text-muted-foreground">Supported Types</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage how you receive payments from clients
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Add a new way to receive payments from clients
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Payment Type</Label>
                    <Select 
                      value={newMethod.type} 
                      onValueChange={(value: PaymentMethod['type']) => 
                        setNewMethod(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(paymentTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Method Name</Label>
                    <Input
                      value={newMethod.name}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Main Business Account"
                    />
                  </div>
                  
                  <div>
                    <Label>Details</Label>
                    <Input
                      value={newMethod.details}
                      onChange={(e) => setNewMethod(prev => ({ ...prev, details: e.target.value }))}
                      placeholder="e.g., account number, email, API key"
                    />
                  </div>
                  
                  <Button onClick={handleAddMethod} className="w-full">
                    Add Payment Method
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell>
                      <Badge className={paymentTypeColors[method.type]}>
                        {paymentTypeLabels[method.type]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{method.details}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={method.isActive ? 
                        'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }>
                        {method.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(method.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(method.id)}
                        >
                          {method.isActive ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteMethod(method.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {paymentMethods.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No payment methods configured. Add one to start receiving payments.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodsManager;