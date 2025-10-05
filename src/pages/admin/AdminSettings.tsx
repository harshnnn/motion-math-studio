import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Settings, User, DollarSign, Bell, Shield } from 'lucide-react';
import PaymentMethodsManager from '@/components/admin/PaymentMethodsManager';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'Math in Motion',
    adminEmail: 'contact@algovisuals.org',
    notificationsEnabled: true,
    autoAssignment: false,
    emailNotifications: true,
    projectReminders: true,
    paymentReminders: true,
    defaultPricing: {
      basic2D: 500,
      advanced2D: 1000,
      basic3D: 1500,
      advanced3D: 3000,
      explainer: 800,
      whiteboard: 600
    },
    businessInfo: {
      companyName: 'Math in Motion',
      address: '123 Animation Street, Creative City, CC 12345',
      phone: '+1 (555) 123-4567',
      website: 'https://www.algovisuals.org',
      taxId: 'TAX123456789'
    }
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
    toast({
      title: "Settings Saved",
      description: "Your admin settings have been updated successfully",
    });
  };

  const handlePricingUpdate = (type: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      defaultPricing: {
        ...prev.defaultPricing,
        [type]: value
      }
    }));
  };

  const handleBusinessInfoUpdate = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <Button onClick={handleSave}>Save All Changes</Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="business">Business Info</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>
                Basic website and admin configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.businessInfo.companyName}
                    onChange={(e) => handleBusinessInfoUpdate('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.businessInfo.phone}
                    onChange={(e) => handleBusinessInfoUpdate('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={settings.businessInfo.address}
                  onChange={(e) => handleBusinessInfoUpdate('address', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={settings.businessInfo.website}
                    onChange={(e) => handleBusinessInfoUpdate('website', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    value={settings.businessInfo.taxId}
                    onChange={(e) => handleBusinessInfoUpdate('taxId', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Default Pricing</span>
              </CardTitle>
              <CardDescription>
                Set default pricing for different animation types (per minute)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basic2D">Basic 2D Animation ($)</Label>
                  <Input
                    id="basic2D"
                    type="number"
                    value={settings.defaultPricing.basic2D}
                    onChange={(e) => handlePricingUpdate('basic2D', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="advanced2D">Advanced 2D Animation ($)</Label>
                  <Input
                    id="advanced2D"
                    type="number"
                    value={settings.defaultPricing.advanced2D}
                    onChange={(e) => handlePricingUpdate('advanced2D', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="basic3D">Basic 3D Animation ($)</Label>
                  <Input
                    id="basic3D"
                    type="number"
                    value={settings.defaultPricing.basic3D}
                    onChange={(e) => handlePricingUpdate('basic3D', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="advanced3D">Advanced 3D Animation ($)</Label>
                  <Input
                    id="advanced3D"
                    type="number"
                    value={settings.defaultPricing.advanced3D}
                    onChange={(e) => handlePricingUpdate('advanced3D', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="explainer">Explainer Video ($)</Label>
                  <Input
                    id="explainer"
                    type="number"
                    value={settings.defaultPricing.explainer}
                    onChange={(e) => handlePricingUpdate('explainer', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="whiteboard">Whiteboard Animation ($)</Label>
                  <Input
                    id="whiteboard"
                    type="number"
                    value={settings.defaultPricing.whiteboard}
                    onChange={(e) => handlePricingUpdate('whiteboard', Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Pricing Notes</h4>
                <p className="text-sm text-muted-foreground">
                  These are base rates per minute of animation. Final pricing may vary based on complexity, 
                  timeline, and specific client requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <PaymentMethodsManager />
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications for new requests</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="projectReminders">Project Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders for project deadlines and milestones</p>
                </div>
                <Switch
                  id="projectReminders"
                  checked={settings.projectReminders}
                  onCheckedChange={(checked) => setSettings({...settings, projectReminders: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="paymentReminders">Payment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts for overdue payments</p>
                </div>
                <Switch
                  id="paymentReminders"
                  checked={settings.paymentReminders}
                  onCheckedChange={(checked) => setSettings({...settings, paymentReminders: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoAssignment">Auto Assignment</Label>
                  <p className="text-sm text-muted-foreground">Automatically assign projects to available animators</p>
                </div>
                <Switch
                  id="autoAssignment"
                  checked={settings.autoAssignment}
                  onCheckedChange={(checked) => setSettings({...settings, autoAssignment: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>
                Manage admin account security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Button variant="outline" className="w-fit">Update Password</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Session Management</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows - 192.168.1.1</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                  </div>
                  
                  <Button variant="outline" className="w-fit">
                    Sign Out All Other Sessions
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Security Logs</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Last login</span>
                    <span className="text-muted-foreground">Today at 9:15 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Password changed</span>
                    <span className="text-muted-foreground">Never</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Failed login attempts</span>
                    <span className="text-muted-foreground">0 in last 30 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;