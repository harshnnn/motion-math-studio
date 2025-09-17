import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

type AnimationType = 'formula_basic' | 'formula_advanced' | 'math_objects_3d' | 'research_full';

interface ProjectData {
  title: string;
  description: string;
  animationType: AnimationType;
  duration?: number;
  stylePreferences: string;
  scriptContent: string;
  budgetMin?: number;
  budgetMax?: number;
  deadline?: string;
}

const ProjectRequestForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    animationType: 'formula_basic',
    stylePreferences: '',
    scriptContent: '',
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const animationTypes = [
    {
      value: 'formula_basic',
      label: 'Basic Formula Animation',
      description: 'Simple mathematical formulas and equations (5-20 seconds)',
    },
    {
      value: 'formula_advanced',
      label: 'Advanced Formula Animation',
      description: 'Complex equations with advanced typography and effects',
    },
    {
      value: 'math_objects_3d',
      label: '3D Mathematical Objects',
      description: 'Interactive 3D visualizations and geometric objects',
    },
    {
      value: 'research_full',
      label: 'Full Research Animation',
      description: 'Complete research paper visualizations with custom storyboarding',
    },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a project request.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    // Validate required fields
    if (!projectData.title.trim()) {
      toast({
        title: "Missing project title",
        description: "Please enter a project title.",
        variant: "destructive",
      });
      return;
    }

    if (!projectData.description.trim()) {
      toast({
        title: "Missing project description",
        description: "Please enter a project description.",
        variant: "destructive",
      });
      return;
    }

    if (!projectData.animationType) {
      toast({
        title: "Missing animation type",
        description: "Please select an animation type.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        title: projectData.title,
        description: projectData.description,
        animation_type: projectData.animationType,
        duration_seconds: projectData.duration,
        style_preferences: projectData.stylePreferences,
        script_content: projectData.scriptContent,
        budget_min: projectData.budgetMin,
        budget_max: projectData.budgetMax,
        deadline: projectData.deadline,
        status: 'submitted',
      });

      if (error) throw error;

      toast({
        title: "Project submitted successfully!",
        description: "We'll review your request and get back to you within 24 hours.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting project:', error);
      toast({
        title: "Error submitting project",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const updateProjectData = (updates: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="e.g., Quantum Mechanics Wave Function Animation"
                value={projectData.title}
                onChange={(e) => updateProjectData({ title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your mathematical concept and what you want to visualize..."
                rows={4}
                value={projectData.description}
                onChange={(e) => updateProjectData({ description: e.target.value })}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Animation Type</Label>
              <RadioGroup
                value={projectData.animationType}
                onValueChange={(value: AnimationType) =>
                  updateProjectData({ animationType: value })
                }
                className="space-y-3"
              >
                {animationTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-surface-elevated transition-colors">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <div className="flex-1">
                      <Label htmlFor={type.value} className="font-medium cursor-pointer">
                        {type.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Select
                value={projectData.duration?.toString()}
                onValueChange={(value) => updateProjectData({ duration: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                  <SelectItem value="120">2 minutes</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="script">Mathematical Content / Script</Label>
              <Textarea
                id="script"
                placeholder="Provide your mathematical equations, formulas, or script content..."
                rows={6}
                value={projectData.scriptContent}
                onChange={(e) => updateProjectData({ scriptContent: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style Preferences</Label>
              <Textarea
                id="style"
                placeholder="Describe your preferred visual style, colors, fonts, or reference materials..."
                rows={3}
                value={projectData.stylePreferences}
                onChange={(e) => updateProjectData({ stylePreferences: e.target.value })}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget-min">Minimum Budget ($)</Label>
                <Input
                  id="budget-min"
                  type="number"
                  placeholder="50"
                  value={projectData.budgetMin || ''}
                  onChange={(e) => updateProjectData({ budgetMin: parseInt(e.target.value) || undefined })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-max">Maximum Budget ($)</Label>
                <Input
                  id="budget-max"
                  type="number"
                  placeholder="500"
                  value={projectData.budgetMax || ''}
                  onChange={(e) => updateProjectData({ budgetMax: parseInt(e.target.value) || undefined })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Preferred Deadline (optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={projectData.deadline || ''}
                onChange={(e) => updateProjectData({ deadline: e.target.value })}
              />
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Project Summary</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Title:</strong> {projectData.title}</p>
                <p><strong>Type:</strong> {animationTypes.find(t => t.value === projectData.animationType)?.label}</p>
                <p><strong>Duration:</strong> {projectData.duration} seconds</p>
                <p><strong>Budget:</strong> ${projectData.budgetMin} - ${projectData.budgetMax}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-text bg-clip-text text-transparent">
          Submit Project Request
        </CardTitle>
        <CardDescription>
          Step {currentStep} of {totalSteps}: Tell us about your mathematical animation project
        </CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStep()}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>

          {currentStep === totalSteps ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !projectData.title || !projectData.description}
            >
              {isSubmitting ? "Submitting..." : "Submit Project"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!projectData.title || !projectData.description)) ||
                (currentStep === 3 && !projectData.scriptContent)
              }
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectRequestForm;