# Animation System - Cheat Sheet

## Quick Copy-Paste Examples

### 1. Simple Page with Animations
```tsx
import { PageTransition } from '@/components/animations/PageTransition';
import { SlideIn, FadeIn } from '@/components/animations';

export default function Page() {
  return (
    <PageTransition>
      <SlideIn direction="down">
        <h1>Title</h1>
      </SlideIn>
      <FadeIn delay={0.2}>
        <p>Content</p>
      </FadeIn>
    </PageTransition>
  );
}
```

### 2. Stats Dashboard
```tsx
import { StatCard } from '@/components/animations/StatCard';
import { Trophy } from 'lucide-react';

<div className="grid gap-6">
  <StatCard title="Points" value="2,450" icon={<Trophy />} delay={0} />
  <StatCard title="Rank" value="#5" icon={<Medal />} delay={0.1} />
</div>
```

### 3. Animated List
```tsx
import { StaggerContainer } from '@/components/animations';

<StaggerContainer>
  {users.map(user => (
    <div key={user.id} className="p-4 bg-slate-800 rounded">
      {user.name}
    </div>
  ))}
</StaggerContainer>
```

### 4. Scroll-Triggered Animation
```tsx
import { useScrollAnimation } from '@/hooks/use-animations';

export default function Section() {
  const ref = useScrollAnimation();
  return <div ref={ref} className="animate-slide-up">Content</div>;
}
```

### 5. Hover Effects
```tsx
<div className="hover-lift hover-glow p-6 rounded-xl bg-slate-800">
  Hover over me!
</div>
```

### 6. Loading Button
```tsx
<Button loading={isLoading} onClick={handleSave}>
  Save Changes
</Button>
```

## Animation Classes at a Glance

| Purpose | Class | Effect |
|---------|-------|--------|
| **Entrance** | `animate-slide-in-up` | Slide from bottom |
| | `animate-fade-in` | Fade in |
| | `animate-scale-in` | Scale up |
| **Hover** | `hover-lift` | Lifts with shadow |
| | `hover-glow` | Adds glow |
| | `hover-scale` | Scales up |
| **Continuous** | `animate-pulse-glow` | Pulsing glow |
| | `animate-float` | Floating motion |
| | `animate-shimmer` | Shimmer effect |
| **Text** | `gradient-text-animate` | Gradient animation |
| | `animate-neon-glow` | Neon text glow |
| **Lists** | `stagger-animation-item` | Staggered entrance |
| **Loading** | `loading-skeleton` | Shimmer skeleton |

## Component Props

### StatCard
```tsx
<StatCard 
  title="string"           // Title
  value="string|number"    // Display value
  icon="ReactNode"         // Icon component (optional)
  delay={number}           // Animation delay in seconds
  trend={{                 // Trend indicator (optional)
    value: number,
    isPositive: boolean
  }}
/>
```

### StaggerContainer
```tsx
<StaggerContainer 
  className="string"       // Additional classes
  delay={number}           // Starting delay
>
  {/* Children auto-stagger */}
</StaggerContainer>
```

### SlideIn
```tsx
<SlideIn 
  direction="up|down|left|right"
  delay={number}
  className="string"
/>
```

### FadeIn
```tsx
<FadeIn 
  delay={number}
  duration="slow|normal|fast"
  className="string"
/>
```

### AnimatedCard
```tsx
<AnimatedCard 
  delay={number}
  hover={boolean}          // Enable hover lift
  glow={boolean}           // Enable glow on hover
  className="string"
/>
```

## Hook Options

### useScrollAnimation()
Triggers on scroll into view
```tsx
const ref = useScrollAnimation();
```

### useFadeInOnScroll()
Fades in when visible
```tsx
const ref = useFadeInOnScroll();
```

### useParallaxScroll()
Parallax scroll effect
```tsx
const ref = useParallaxScroll();
```

### useStaggerAnimation(count)
Stagger group of elements
```tsx
const ref = useStaggerAnimation(5);
```

## Timing Reference

| Duration | CSS Class |
|----------|-----------|
| 300ms | `duration-300` |
| 500ms | `duration-500` |
| 700ms | `duration-700` |

## Easing Reference

| Easing | CSS Class | Use Case |
|--------|-----------|----------|
| Smooth | `ease-smooth` | General animations |
| Out back | `ease-out-back` | Entrance with overshoot |
| Standard | `ease-out` | Default |

## Animation Delays

Use `delay-{value}s` for:
```tsx
delay={0.1}  // 100ms
delay={0.2}  // 200ms
delay={0.3}  // 300ms
delay={0.5}  // 500ms
```

## Common Issues & Solutions

### Animation not showing?
- Check element has CSS `opacity: 0` initially
- Verify animation class is correct
- Ensure Tailwind build includes file

### Animation jerky?
- Use `transform` instead of position changes
- Add `will-change` for heavy animations
- Check for expensive operations during animation

### Animation too fast/slow?
- Adjust `delay` prop: `delay={0.2}`
- Modify `duration` in Tailwind config
- Use `animation-duration` CSS property

### Mobile animations laggy?
- Reduce complexity
- Use GPU acceleration (transform, opacity)
- Test on actual device
- Consider `prefers-reduced-motion`

## File Locations

- Animation components: `src/components/animations/`
- Custom hooks: `src/hooks/use-animations.ts`
- Button component: `src/components/ui/button.tsx`
- Navbar: `src/components/dashboard/Navbar.tsx`
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`

## Documentation Files

- Full docs: `ANIMATION_SYSTEM.md`
- Quick start: `ANIMATION_QUICK_START.md`
- This file: `ANIMATION_CHEAT_SHEET.md`
- Demo: `src/components/animations/AnimationShowcase.tsx`

## Color Palette for Animations

- Primary: Cyan (`#38bdf8`)
- Secondary: Blue (`#2563eb`)
- Accent: Purple (`#a855f7`)
- Success: Green (`#10b981`)
- Warning: Yellow (`#f59e0b`)
- Error: Red (`#ef4444`)

## Performance Tips

1. **GPU Acceleration**: Use `transform` and `opacity`
2. **Debounce**: On scroll heavy animations
3. **Lazy Load**: Defer non-critical animations
4. **Reduce Motion**: Respect `prefers-reduced-motion`
5. **Test**: Check 60fps on target devices

## Browser Support

✅ Chrome 88+
✅ Firefox 85+
✅ Safari 14+
✅ Edge 88+
⚠️ IE 11: No support (use fallbacks)

## Next Steps

1. Review `ANIMATION_SYSTEM.md` for full documentation
2. Check `AnimationShowcase.tsx` for examples
3. Apply to your pages using patterns from `ANIMATION_QUICK_START.md`
4. Reference this sheet for quick lookups
