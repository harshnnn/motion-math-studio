import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TestimonialsManager from '@/components/admin/TestimonialsManager';

const AdminTestimonials: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialsManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestimonials;
