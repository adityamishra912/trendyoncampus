# Animation System Documentation

## Overview
This document describes the comprehensive animation system implemented throughout the Trendy Campus Ambassador Portal. The system provides smooth, modern animations that enhance user experience with entrance animations, transitions, hover effects, and micro-interactions.

## Features Implemented

### 1. Tailwind Configuration (`tailwind.config.ts`)
Extended with 20+ custom animations and keyframes:

- **Fade Animations**: `fade-in`, `fade-in-slow`, `fade-out`
- **Slide Animations**: `slide-in-up`, `slide-in-down`, `slide-in-left`, `slide-in-right`, `slide-out-up`
- **Scale Animations**: `scale-in`, `scale-in-slow`, `scale-up`
- **Glow & Pulse**: `pulse-glow`, `glow-pulse`, `shimmer`, `float`
- **Bounce & Effects**: `bounce-soft`, `wobble`, `spin-slow`, `button-press`

### 2. Global Styles (`globals.css`)
Added 50+ utility classes and animations:

#### Entrance Animations
```css
.animate-slide-up - Slides in from bottom with fade
.animate-bounce-in - Bounces in with scale effect
.animate-fade-in - Smooth fade in
.animate-neon-glow - Text glow animation
```

#### Interactive Effects
```css
.glass-card:hover - Enhanced card hover with lift and glow
.hover-lift - Lifts element on hover
.hover-glow - Adds glow effect on hover
.hover-scale - Scales element on hover
.btn-glow - Button ripple effect
```

#### Stagger Animations
```css
.stagger-animation-item - Staggered entrance for list items (nth-child delays)
```

#### Input Animations
```css
.cyber-input - Enhanced input with focus animations and scale effect
.cyber-label - Animated label
.cyber-select-native - Animated select dropdown
```

### 3. Reusable Animation Components (`src/components/animations/`)

#### AnimatedCard.tsx
```tsx
<AnimatedCard delay={0.1} hover glow>
  Card content with animations
</AnimatedCard>
```

#### index.tsx - Animation Wrappers
- `StaggerContainer` - Creates staggered animations for children
- `FadeIn` - Configurable fade-in animations
- `SlideIn` - Slide from any direction
- `ScaleIn` - Scale entrance effect
- `PulseGlow` - Glowing pulse effect
- `Floating` - Floating animation
- `Shimmer` - Shimmer effect

#### StatCard.tsx
```tsx
<StatCard 
  title="Total Users" 
  value={1234} 
  icon={<Users />}
  delay={0.2}
  trend={{ value: 12, isPositive: true }}
/>
```

#### PageTransition.tsx
- `PageTransition` - Wraps pages for entrance animations
- `GradientText` - Animated gradient text
- `AnimatedNumber` - Auto-incrementing counter animation
- `AnimatedList` - List with staggered item animations

### 4. Animation Hooks (`src/hooks/use-animations.ts`)

#### useScrollAnimation()
Triggers animation when element enters viewport:
```tsx
const ref = useScrollAnimation();
return <div ref={ref}>Content that animates on scroll</div>;
```

#### useStaggerAnimation(itemCount)
Staggered animations for groups of items:
```tsx
const ref = useStaggerAnimation(5);
return (
  <div ref={ref}>
    <div data-stagger-item>Item 1</div>
    <div data-stagger-item>Item 2</div>
  </div>
);
```

#### useParallaxScroll()
Parallax scrolling effect:
```tsx
const ref = useParallaxScroll();
return <div ref={ref}>Parallax content</div>;
```

#### useFadeInOnScroll()
Fade in when entering viewport:
```tsx
const ref = useFadeInOnScroll();
return <div ref={ref}>Content</div>;
```

#### useCounterAnimation(finalValue, duration)
Animated number counter:
```tsx
const count = useCounterAnimation(1000, 2000);
return <div>{count}</div>;
```

### 5. Enhanced Button Component
Updated button with:
- Gradient backgrounds with hover animation
- Scale effects on hover and click
- Loading state with spinner
- Glow effects and ripple animations
- Smooth transitions

```tsx
<Button loading variant="default" size="md">
  Click me
</Button>
```

### 6. Enhanced Navigation
Navbar with:
- Slide-in entrance animations
- Staggered nav items
- Glow pulse on active state
- Hover scale and glow effects
- Floating icon animation

## Usage Examples

### Basic Page Transition
```tsx
import { PageTransition } from '@/components/animations/PageTransition';

export default function Page() {
  return (
    <PageTransition>
      <h1>Welcome</h1>
      <p>Page content here</p>
    </PageTransition>
  );
}
```

### Staggered List
```tsx
import { StaggerContainer } from '@/components/animations';

export default function UserList({ users }) {
  return (
    <StaggerContainer>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </StaggerContainer>
  );
}
```

### Animated Statistics
```tsx
import { StatCard } from '@/components/animations/StatCard';
import { Trophy } from 'lucide-react';

export default function Stats() {
  return (
    <div className="grid gap-6">
      <StatCard title="Points" value="2,450" icon={<Trophy />} delay={0} />
      <StatCard title="Rank" value="#5" icon={<Medal />} delay={0.1} />
    </div>
  );
}
```

### Scroll-triggered Animation
```tsx
import { useScrollAnimation } from '@/hooks/use-animations';

export default function ScrollSection() {
  const ref = useScrollAnimation();
  return <div ref={ref} className="animate-slide-up">Content</div>;
}
```

### Gradient Text
```tsx
import { GradientText } from '@/components/animations/PageTransition';

export default function Title() {
  return <h1><GradientText animated>Trendy TCAP</GradientText></h1>;
}
```

## CSS Animation Classes Reference

### Entrance Animations
| Class | Effect |
|-------|--------|
| `animate-fade-in` | Fade in over 0.5s |
| `animate-slide-in-up` | Slide up with fade |
| `animate-slide-in-down` | Slide down with fade |
| `animate-scale-in` | Scale up with fade |
| `animate-bounce-in` | Bounce in effect |

### Continuous Animations
| Class | Effect |
|-------|--------|
| `animate-pulse-glow` | Pulsing glow effect |
| `animate-glow-pulse` | Glowing pulse |
| `animate-shimmer` | Shimmer effect |
| `animate-float` | Floating up/down |
| `animate-spin-slow` | Slow spin |
| `animate-bounce-soft` | Soft bounce |

### Hover Effects
| Class | Effect |
|-------|--------|
| `hover-lift` | Lifts on hover with shadow |
| `hover-glow` | Adds glow on hover |
| `hover-scale` | Scales up on hover |
| `glass-card:hover` | Glass card enhanced hover |

### Special Effects
| Class | Effect |
|-------|--------|
| `animate-neon-glow` | Text neon glow |
| `animate-shimmer-text` | Text shimmer effect |
| `stagger-animation-item` | Staggered entrance |
| `loading-skeleton` | Loading shimmer |

## Animation Performance Tips

1. **Use `will-change` CSS property** for elements with complex animations
2. **Limit simultaneous animations** to avoid jank
3. **Use GPU-accelerated properties** (transform, opacity) instead of position changes
4. **Test on lower-end devices** to ensure smooth performance
5. **Disable animations for users preferring reduced motion**

## Accessibility Considerations

All animations respect the `prefers-reduced-motion` preference when implemented with hooks:

```tsx
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Disable or reduce animations accordingly
}, []);
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

All animations use standard CSS and JavaScript APIs with no external animation library dependencies (except Tailwind CSS which is already included).

## Future Enhancements

Potential additions:
- Page route transitions with Framer Motion
- Gesture-based animations on mobile
- Theme-based animation variations
- Animation preference settings for users
- More complex 3D animations using Three.js
- Keyframe animations for complex sequences

## Files Modified/Created

### Modified Files
- `tailwind.config.ts` - Added 20+ animations and keyframes
- `globals.css` - Added 50+ animation utilities
- `src/components/ui/button.tsx` - Enhanced with animations
- `src/components/dashboard/Navbar.tsx` - Added entrance and interaction animations

### New Files Created
- `src/components/animations/AnimatedCard.tsx` - Animated card wrapper
- `src/components/animations/index.tsx` - Animation component wrappers
- `src/components/animations/StatCard.tsx` - Animated stat card component
- `src/components/animations/PageTransition.tsx` - Page transition utilities
- `src/hooks/use-animations.ts` - Custom animation hooks

## Credits

Animations designed for modern web experiences with:
- Smooth cubic-bezier easing
- Staggered entrance effects
- Hover and interaction feedback
- Glow and glass-morphism effects
- Performance-optimized implementation
