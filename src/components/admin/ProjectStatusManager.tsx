import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  status: string;
  estimated_price?: number;
  final_price?: number;
}

interface ProjectStatusManagerProps {
  project: Project;
  onUpdate: (updates: any) => void;
}

const ProjectStatusManager: React.FC<ProjectStatusManagerProps> = ({ project, onUpdate }) => {
  const [status, setStatus] = useState(project.status);
  const [finalPrice, setFinalPrice] = useState(project.final_price ? (project.final_price / 100).toString() : '');
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const statusOptions = [
    { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
    { value: 'under_review', label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'payment_pending', label: 'Payment Pending', color: 'bg-orange-100 text-orange-800' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'assigned_to_animator', label: 'Assigned to Animator', color: 'bg-purple-100 text-purple-800' },
    { value: 'in_revision', label: 'In Revision', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const getCurrentStatusInfo = () => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const handleUpdateProject = async () => {
    setUpdating(true);
    try {
      const updates: any = { status };
      
      if (finalPrice && !project.final_price) {
        updates.final_price = parseInt(finalPrice);
      }
      
      if (notes.trim()) {
        updates.notes = notes;
      }

      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', project.id);

      if (error) throw error;

      onUpdate(updates);
      
      toast({
        title: "Project Updated",
        description: "Project status and details updated successfully",
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusWorkflow = () => {
    const workflows = {
      draft: ['under_review'],
      under_review: ['payment_pending', 'in_revision', 'cancelled'],
      payment_pending: ['in_progress', 'cancelled'],
      in_progress: ['assigned_to_animator', 'in_revision', 'completed'],
      assigned_to_animator: ['in_progress', 'in_revision', 'completed'],
      in_revision: ['in_progress', 'completed', 'assigned_to_animator'],
      completed: [],
      cancelled: ['under_review']
    };
    
    return workflows[status as keyof typeof workflows] || [];
  };

  const suggestedStatuses = getStatusWorkflow();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Status
            <Badge className={getCurrentStatusInfo().color}>
              {getCurrentStatusInfo().label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Update Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {suggestedStatuses.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Suggested next steps: {suggestedStatuses.map(s => 
                    statusOptions.find(opt => opt.value === s)?.label
                  ).join(', ')}
                </p>
              )}
            </div>

            {!project.final_price && (
              <div>
                <Label>Set Final Price (USD)</Label>
                <Input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  placeholder="Enter final price"
                />
                {project.estimated_price && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimated price: ${(project.estimated_price / 100).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            <div>
              <Label>Add Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this status update..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleUpdateProject} 
              disabled={updating || status === project.status}
              className="w-full"
            >
              {updating ? 'Updating...' : 'Update Project'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status Workflow Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
              <span>→ Initial review and assessment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-orange-100 text-orange-800">Payment Pending</Badge>
              <span>→ Waiting for client payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
              <span>→ Active development/animation work</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-800">Assigned to Animator</Badge>
              <span>→ Specific team member assigned</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-indigo-100 text-indigo-800">In Revision</Badge>
              <span>→ Client feedback and revisions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
              <span>→ Project delivered and finalized</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatusManager;
