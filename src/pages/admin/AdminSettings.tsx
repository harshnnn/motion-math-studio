import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';
import { Save, User, Globe, DollarSign, Bell, Shield } from 'lucide-react';

const AdminSettings = () => {
  const { adminUser } = useAdminAuth();
  const { toast } = useToast();
  
  // Admin Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    username: adminUser?.username || '',
    email: adminUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Website Configuration
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: 'MathInMotion',
    tagline: 'Professional Mathematical Animation Services',
    contactEmail: 'contact@mathinmotion.com',
    phone: '+1 (555) 123-4567',
    address: '123 Animation Street, Creative City, CC 12345'
  });

  // Pricing Configuration
  const [pricingSettings, setPricingSettings] = useState({
    basicFormulaRate: 150,
    advancedFormulaRate: 250,
    mathObjects3DRate: 350,
    researchFullRate: 500,
    rushOrderMultiplier: 1.5,
    bulkDiscountThreshold: 5,
    bulkDiscountPercentage: 15
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNewRequests: true,
    emailPayments: true,
    emailTeamUpdates: false,
    browserNotifications: true,
    dailyReports: true,
    weeklyReports: false
  });

  const handleSaveProfile = () => {
    // In a real app, this would update the admin profile
    toast({
      title: "Profile Updated",
      description: "Your admin profile has been updated successfully.",
    });
  };

  const handleSaveWebsite = () => {
    // In a real app, this would update website configuration
    toast({
      title: "Website Settings Updated",
      description: "Website configuration has been saved.",
    });
  };

  const handleSavePricing = () => {
    // In a real app, this would update pricing configuration
    toast({
      title: "Pricing Updated",
      description: "Pricing configuration has been saved.",
    });
  };

  const handleSaveNotifications = () => {
    // In a real app, this would update notification preferences
    toast({
      title: "Notifications Updated",
      description: "Notification preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <CardTitle>Admin Profile</CardTitle>
          </div>
          <CardDescription>
            Manage your admin account settings and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profileSettings.username}
                onChange={(e) => setProfileSettings(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileSettings.email}
                onChange={(e) => setProfileSettings(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
              />
            </div>
          </div>

          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={profileSettings.currentPassword}
                  onChange={(e) => setProfileSettings(prev => ({
                    ...prev,
                    currentPassword: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={profileSettings.newPassword}
                  onChange={(e) => setProfileSettings(prev => ({
                    ...prev,
                    newPassword: e.target.value
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={profileSettings.confirmPassword}
                  onChange={(e) => setProfileSettings(prev => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSaveProfile}>
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Website Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Website Configuration</CardTitle>
          </div>
          <CardDescription>
            Configure your website's general settings and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={websiteSettings.siteName}
                onChange={(e) => setWebsiteSettings(prev => ({
                  ...prev,
                  siteName: e.target.value
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={websiteSettings.contactEmail}
                onChange={(e) => setWebsiteSettings(prev => ({
                  ...prev,
                  contactEmail: e.target.value
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={websiteSettings.phone}
                onChange={(e) => setWebsiteSettings(prev => ({
                  ...prev,
                  phone: e.target.value
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={websiteSettings.tagline}
              onChange={(e) => setWebsiteSettings(prev => ({
                ...prev,
                tagline: e.target.value
              }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={websiteSettings.address}
              onChange={(e) => setWebsiteSettings(prev => ({
                ...prev,
                address: e.target.value
              }))}
              rows={3}
            />
          </div>

          <Button onClick={handleSaveWebsite}>
            <Save className="h-4 w-4 mr-2" />
            Save Website Settings
          </Button>
        </CardContent>
      </Card>

      {/* Pricing Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <CardTitle>Pricing Configuration</CardTitle>
          </div>
          <CardDescription>
            Set default pricing rates and modifiers for different animation types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basicRate">Basic Formula Rate (per minute)</Label>
              <Input
                id="basicRate"
                type="number"
                value={pricingSettings.basicFormulaRate}
                onChange={(e) => setPricingSettings(prev => ({
                  ...prev,
                  basicFormulaRate: parseInt(e.target.value)
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advancedRate">Advanced Formula Rate (per minute)</Label>
              <Input
                id="advancedRate"
                type="number"
                value={pricingSettings.advancedFormulaRate}
                onChange={(e) => setPricingSettings(prev => ({
                  ...prev,
                  advancedFormulaRate: parseInt(e.target.value)
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="objects3DRate">3D Math Objects Rate (per minute)</Label>
              <Input
                id="objects3DRate"
                type="number"
                value={pricingSettings.mathObjects3DRate}
                onChange={(e) => setPricingSettings(prev => ({
                  ...prev,
                  mathObjects3DRate: parseInt(e.target.value)
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="researchRate">Full Research Rate (per minute)</Label>
              <Input
                id="researchRate"
                type="number"
                value={pricingSettings.researchFullRate}
                onChange={(e) => setPricingSettings(prev => ({
                  ...prev,
                  researchFullRate: parseInt(e.target.value)
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rushMultiplier">Rush Order Multiplier</Label>
              <Input
                id="rushMultiplier"
                type="number"
                step="0.1"
                value={pricingSettings.rushOrderMultiplier}
                onChange={(e) => setPricingSettings(prev => ({
                  ...prev,
                  rushOrderMultiplier: parseFloat(e.target.value)
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bulkDiscount">Bulk Discount (%)</Label>
              <Input
                id="bulkDiscount"
                type="number"
                value={pricingSettings.bulkDiscountPercentage}
                onChange={(e) => setPricingSettings(prev => ({
                  ...prev,
                  bulkDiscountPercentage: parseInt(e.target.value)
                }))}
              />
            </div>
          </div>

          <Button onClick={handleSavePricing}>
            <Save className="h-4 w-4 mr-2" />
            Save Pricing Settings
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>
            Configure your notification preferences and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email for New Requests</Label>
                <p className="text-sm text-muted-foreground">Get notified when new project requests are submitted</p>
              </div>
              <Switch
                checked={notificationSettings.emailNewRequests}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({
                  ...prev,
                  emailNewRequests: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about payment updates and confirmations</p>
              </div>
              <Switch
                checked={notificationSettings.emailPayments}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({
                  ...prev,
                  emailPayments: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Team Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about team member activity and updates</p>
              </div>
              <Switch
                checked={notificationSettings.emailTeamUpdates}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({
                  ...prev,
                  emailTeamUpdates: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Browser Notifications</Label>
                <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
              </div>
              <Switch
                checked={notificationSettings.browserNotifications}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({
                  ...prev,
                  browserNotifications: checked
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Reports</Label>
                <p className="text-sm text-muted-foreground">Receive daily summary reports via email</p>
              </div>
              <Switch
                checked={notificationSettings.dailyReports}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({
                  ...prev,
                  dailyReports: checked
                }))}
              />
            </div>
          </div>

          <Button onClick={handleSaveNotifications}>
            <Save className="h-4 w-4 mr-2" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;