import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/currency';
import { useRegionCurrency } from '@/hooks/useRegionCurrency';

type AnimationType = 'formula_basic' | 'formula_advanced' | 'math_objects_3d' | 'research_full';

interface EstimateData {
  animationType: AnimationType;
  duration: number;
  complexity: number;
  email?: string;
}

const EstimateCalculator = () => {
  const { currency } = useRegionCurrency('USD');
  const [estimateData, setEstimateData] = useState<EstimateData>({
    animationType: 'formula_basic',
    duration: 10,
    complexity: 1,
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  // Region-aware base prices per animation type
  const baseByType: Record<AnimationType, number> = useMemo(() => {
    if (currency === 'INR') {
      return {
        formula_basic: 499,
        formula_advanced: 999,
        math_objects_3d: 1499,
        research_full: 4999,
      };
    }
    // USD defaults
    return {
      formula_basic: 15,
      formula_advanced: 50,
      math_objects_3d: 150,
      research_full: 800,
    };
  }, [currency]);

  // Simple metadata for rendering (no prices here)
  const animationTypes: { value: AnimationType; label: string; description: string }[] = [
    { value: 'formula_basic', label: 'Basic Formula', description: 'Simple mathematical formulas and equations' },
    { value: 'formula_advanced', label: 'Advanced Formula', description: 'Complex equations with advanced typography' },
    { value: 'math_objects_3d', label: '3D Math Objects', description: 'Interactive 3D mathematical visualizations' },
    { value: 'research_full', label: 'Research Animation', description: 'Full research paper visualizations' },
  ];

  const calculateEstimate = () => {
    const basePrice = baseByType[estimateData.animationType];
    const durationMultiplier = Math.max(1, estimateData.duration / 25);
    const complexityMultiplier = estimateData.complexity;
    return Math.round(basePrice * durationMultiplier * complexityMultiplier);
  };

  const handleCalculate = async () => {
    if (!estimateData.animationType) {
      toast({ title: "Please select an animation type", variant: "destructive" });
      return;
    }

    setIsCalculating(true);
    const price = calculateEstimate();
    setEstimatedPrice(price);

    try {
      const { error } = await supabase.from('quick_estimates').insert({
        animation_type: estimateData.animationType,
        duration_seconds: estimateData.duration,
        complexity_factor: estimateData.complexity,
        estimated_price: price,
        currency, // store the currency used for this estimate
        email: email || null,
      });
      if (error) throw error;

      toast({
        title: "Estimate calculated!",
        description: `Your estimated price is ${formatCurrency(price, currency)}.${email ? ' We\'ve saved this estimate.' : ''}`,
      });
    } catch (error) {
      console.error('Error saving estimate:', error);
      toast({
        title: "Estimate calculated!",
        description: `Your estimated price is ${formatCurrency(price, currency)}. (Could not save)`,
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-text bg-clip-text text-transparent">Quick Estimate Calculator</CardTitle>
        <CardDescription>Get an instant estimate for your mathematical animation project</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Animation Type Selection */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Animation Type</Label>
          <RadioGroup
            value={estimateData.animationType}
            onValueChange={(value: AnimationType) => setEstimateData(prev => ({ ...prev, animationType: value }))}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {animationTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-surface-elevated transition-colors">
                <RadioGroupItem value={type.value} id={type.value} />
                <div className="flex-1">
                  <Label htmlFor={type.value} className="font-medium cursor-pointer">
                    {type.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                  <p className="text-sm font-semibold text-primary">
                    From {formatCurrency(baseByType[type.value], currency)}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Duration Slider */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">
            Duration: {estimateData.duration} seconds
          </Label>
          <Slider
            value={[estimateData.duration]}
            onValueChange={([value]) =>
              setEstimateData(prev => ({ ...prev, duration: value }))
            }
            max={120}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>5s</span>
            <span>120s</span>
          </div>
        </div>

        {/* Complexity Slider */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">
            Complexity: {estimateData.complexity.toFixed(1)}x
          </Label>
          <Slider
            value={[estimateData.complexity]}
            onValueChange={([value]) =>
              setEstimateData(prev => ({ ...prev, complexity: value }))
            }
            max={3}
            min={0.5}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Simple (0.5x)</span>
            <span>Very Complex (3x)</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            We'll save your estimate and send you a copy
          </p>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full"
          size="lg"
        >
          {isCalculating ? "Calculating..." : "Calculate Estimate"}
        </Button>

        {/* Estimated Price Display */}
        {estimatedPrice !== null && (
          <div className="bg-surface border border-primary/30 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Estimated Price</h3>
            <div className="text-3xl font-bold bg-gradient-text bg-clip-text text-transparent">
              {formatCurrency(estimatedPrice, currency)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This is a preliminary estimate. Final price may vary based on specific requirements.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EstimateCalculator;
