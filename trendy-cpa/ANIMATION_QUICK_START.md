# Animation Implementation Guide

Quick guide to apply animations to your pages and components.

## 1. Page-Level Animations

### Wrap entire page with PageTransition:
```tsx
import { PageTransition } from '@/components/animations/PageTransition';

export default function DashboardPage() {
  return (
    <PageTransition>
      <h1>Dashboard</h1>
      {/* Your page content */}
    </PageTransition>
  );
}
```

## 2. Component-Level Animations

### Animated Card:
```tsx
import { AnimatedCard } from '@/components/animations/AnimatedCard';

<AnimatedCard delay={0.1} hover glow>
  Card content
</AnimatedCard>
```

### Stat Cards:
```tsx
import { StatCard } from '@/components/animations/StatCard';
import { Trophy } from 'lucide-react';

<StatCard 
  title="Points" 
  value="2,450" 
  icon={<Trophy />}
  delay={0.2}
  trend={{ value: 12, isPositive: true }}
/>
```

## 3. List Animations

### Staggered Container:
```tsx
import { StaggerContainer } from '@/components/animations';

<StaggerContainer>
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</StaggerContainer>
```

### Animated List:
```tsx
import { AnimatedList } from '@/components/animations/PageTransition';

<AnimatedList items={listItems} />
```

## 4. Entrance Animations

### Slide In:
```tsx
import { SlideIn } from '@/components/animations';

<SlideIn direction="up" delay={0.3}>
  <YourComponent />
</SlideIn>
```

### Fade In:
```tsx
import { FadeIn } from '@/components/animations';

<FadeIn delay={0.2} duration="slow">
  <YourComponent />
</FadeIn>
```

### Scale In:
```tsx
import { ScaleIn } from '@/components/animations';

<ScaleIn delay={0.1} slow>
  <YourComponent />
</ScaleIn>
```

## 5. Direct CSS Classes

### Entrance:
```tsx
<div className="animate-slide-in-up">Slides up</div>
<div className="animate-fade-in">Fades in</div>
<div className="animate-scale-in">Scales in</div>
```

### Hover Effects:
```tsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-glow">Glows on hover</div>
<div className="hover-scale">Scales on hover</div>
```

### Continuous:
```tsx
<div className="animate-pulse-glow">Pulsing glow</div>
<div className="animate-float">Floating</div>
<div className="animate-shimmer">Shimmer effect</div>
```

## 6. Special Effects

### Progress Bar:
```tsx
import { ProgressBar } from '@/components/animations/StatCard';

<ProgressBar 
  label="Tasks" 
  value={5} 
  total={10} 
  color="cyan"
  animated 
/>
```

### Badge:
```tsx
import { Badge } from '@/components/animations/StatCard';

<Badge label="Active" variant="success" animated />
```

### Animated Number:
```tsx
import { AnimatedNumber } from '@/components/animations/PageTransition';

<div className="text-2xl">
  <AnimatedNumber value={1000} suffix=" points" />
</div>
```

### Gradient Text:
```tsx
import { GradientText } from '@/components/animations/PageTransition';

<h1><GradientText animated>Title</GradientText></h1>
```

## 7. Hook-Based Animations

### Scroll Animation:
```tsx
import { useScrollAnimation } from '@/hooks/use-animations';

export default function Component() {
  const ref = useScrollAnimation();
  return <div ref={ref}>Animates on scroll</div>;
}
```

### Fade on Scroll:
```tsx
import { useFadeInOnScroll } from '@/hooks/use-animations';

const ref = useFadeInOnScroll();
return <div ref={ref}>Fades in on scroll</div>;
```

### Parallax Scroll:
```tsx
import { useParallaxScroll } from '@/hooks/use-animations';

const ref = useParallaxScroll();
return <div ref={ref}>Parallax effect</div>;
```

### Stagger Animation:
```tsx
import { useStaggerAnimation } from '@/hooks/use-animations';

export default function List() {
  const ref = useStaggerAnimation(5);
  return (
    <div ref={ref}>
      <div data-stagger-item>Item 1</div>
      <div data-stagger-item>Item 2</div>
    </div>
  );
}
```

## 8. Button Animations

The button component now includes:
- Gradient backgrounds with hover animation
- Scale effects on hover and active states
- Glow effects
- Loading state with spinner

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="md" loading={isLoading}>
  Submit
</Button>
```

## 9. Combining Animations

### Complex Example:
```tsx
import { 
  PageTransition, 
  StaggerContainer, 
  SlideIn,
  GradientText 
} from '@/components/animations';
import { StatCard } from '@/components/animations/StatCard';

export default function Dashboard() {
  return (
    <PageTransition>
      <SlideIn direction="down" delay={0.1}>
        <h1><GradientText animated>Dashboard</GradientText></h1>
      </SlideIn>
      
      <SlideIn direction="up" delay={0.2}>
        <StaggerContainer>
          {stats.map((stat, i) => (
            <StatCard 
              key={i}
              title={stat.title}
              value={stat.value}
              delay={i * 0.1}
            />
          ))}
        </StaggerContainer>
      </SlideIn>
    </PageTransition>
  );
}
```

## 10. Animation Classes Reference

### Timing Functions
- `duration-300` - 300ms
- `duration-500` - 500ms
- `duration-700` - 700ms

### Easing
- `ease-out` - Default easing
- `ease-smooth` - Custom smooth easing
- `ease-out-back` - Overshoot easing

## Tips

1. **Always add delays** to staggered items for better visual effect
2. **Use `delay` prop** for component-based animations
3. **Combine animations** for complex effects
4. **Test on mobile** - some animations may need adjustment
5. **Reference ANIMATION_SYSTEM.md** for complete documentation

## Common Patterns

### Loading State:
```tsx
<Button loading={isLoading}>Save</Button>
```

### List with Entrance:
```tsx
<StaggerContainer>
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</StaggerContainer>
```

### Hover Cards:
```tsx
<div className="hover-lift hover-glow rounded-xl p-6 bg-slate-800">
  Card content
</div>
```

### Hero Section:
```tsx
<PageTransition>
  <SlideIn direction="down">
    <h1><GradientText animated>Welcome</GradientText></h1>
  </SlideIn>
  <SlideIn direction="up" delay={0.2}>
    <p>Subtitle</p>
  </SlideIn>
</PageTransition>
```
