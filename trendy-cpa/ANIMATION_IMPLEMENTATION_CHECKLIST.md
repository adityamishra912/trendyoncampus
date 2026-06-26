# Animation Implementation Checklist

Use this checklist to systematically add animations to all pages and components.

## Dashboard Pages

### [ ] Home Page (`src/app/(dashboard)/dashboard/home/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `SlideIn` to header
- [ ] Add `StatCard` components with delays
- [ ] Wrap user stats with `StaggerContainer`
- [ ] Add hover effects to quick actions
- [ ] Add scroll animations to sections

### [ ] Tasks Page (`src/app/(dashboard)/dashboard/tasks/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `SlideIn` to page title
- [ ] Wrap domain cards with `StaggerContainer`
- [ ] Add `hover-lift hover-glow` classes to domain cards
- [ ] Add scale animation to task images
- [ ] Add fade animation to task descriptions

### [ ] Leaderboard Page (`src/app/(dashboard)/dashboard/leaderboard/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `SlideIn` to header
- [ ] Wrap leaderboard rows with `StaggerContainer`
- [ ] Add animated ranking numbers
- [ ] Add animated badges for achievements
- [ ] Add scroll animation to entries

### [ ] Rewards Page (`src/app/(dashboard)/dashboard/rewards/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Wrap reward cards with `StaggerContainer`
- [ ] Add `hover-lift` to reward items
- [ ] Add `StatCard` for reward stats
- [ ] Add badge animations

### [ ] Settings Page (`src/app/(dashboard)/dashboard/settings/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `SlideIn` to tabs
- [ ] Wrap form sections with `FadeIn`
- [ ] Add loading state to buttons
- [ ] Add success/error animations to forms

### [ ] Account Info (`src/app/(dashboard)/dashboard/settings/account-info/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `StatCard` for info stats
- [ ] Add form animations
- [ ] Add edit animations

### [ ] Edit Profile (`src/app/(dashboard)/dashboard/settings/edit-profile/page.tsx`)
- [ ] Add form field animations
- [ ] Add image upload animation
- [ ] Add submit button loading state

### [ ] Referrals (`src/app/(dashboard)/dashboard/settings/referrals/page.tsx`)
- [ ] Add code copy animation
- [ ] Add referral list stagger animation
- [ ] Add reward animation

## Admin Pages

### [ ] Admin Dashboard (`src/app/(admin)/admin/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `StatCard` for all stats with delays
- [ ] Wrap stat sections with `StaggerContainer`
- [ ] Add `ProgressBar` animations
- [ ] Add chart animations (if using charts)
- [ ] Add quick action button animations

### [ ] Users Page (`src/app/(admin)/admin/users/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add table row animations with stagger
- [ ] Add filter animation
- [ ] Add action button animations
- [ ] Add loading skeleton

### [ ] User Details (`src/app/(admin)/admin/users/[id]/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `SlideIn` to header
- [ ] Wrap info cards with `StaggerContainer`
- [ ] Add badge animations
- [ ] Add profile image animation

### [ ] Tasks Page (`src/app/(admin)/admin/tasks/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Wrap domain cards with `StaggerContainer`
- [ ] Add `StatCard` for task stats
- [ ] Add progress animations
- [ ] Add hover effects

### [ ] RBAC Page (`src/app/(admin)/admin/rbac/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `StatCard` for role stats
- [ ] Wrap team member list with `StaggerContainer`
- [ ] Add form animations
- [ ] Add badge animations

## Manager Pages

### [ ] Manager Dashboard (`src/app/(manager)/manager/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add `StatCard` components
- [ ] Add task cards with `StaggerContainer`
- [ ] Add user list animations
- [ ] Add progress bar animations

### [ ] Manager Tasks (`src/app/(manager)/manager/tasks/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add task list stagger animation
- [ ] Add filter animations
- [ ] Add action button animations

### [ ] Manager Users (`src/app/(manager)/manager/users/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add user list stagger animation
- [ ] Add user card animations
- [ ] Add action animations

### [ ] User Details (`src/app/(manager)/manager/users/[id]/page.tsx`)
- [ ] Add `PageTransition`
- [ ] Wrap info cards with `StaggerContainer`
- [ ] Add badge animations
- [ ] Add stats animations

## Auth Pages

### [ ] Home Page (`src/app/page.tsx`)
- [ ] Add `SlideIn` to features
- [ ] Add scale animations to feature cards
- [ ] Add CTA button animations
- [ ] Keep hero scene animation

### [ ] Sign Up (`src/app/(auth)/auth/page.tsx`)
- [ ] Wrap with `PageTransition`
- [ ] Add step indicator animation
- [ ] Add form field animations
- [ ] Add button loading state
- [ ] Add error/success animations

### [ ] Sign In (if exists)
- [ ] Wrap with `PageTransition`
- [ ] Add form animations
- [ ] Add button loading state

## Components

### [ ] Button Component (Already done)
- [x] Gradient background animation
- [x] Hover scale effect
- [x] Active press animation
- [x] Loading state with spinner
- [x] Glow effect

### [ ] Card Component
- [ ] Add entrance animation on prop
- [ ] Add hover lift effect
- [ ] Add hover glow effect

### [ ] Navbar (Already done)
- [x] Slide in animation
- [x] Nav item stagger animation
- [x] Active state glow
- [x] Hover effects

### [ ] Sidebar
- [ ] Add entrance animation
- [ ] Add nav item hover animation
- [ ] Add active state animation

### [ ] Modal/Dialog
- [ ] Add entrance animation
- [ ] Add exit animation
- [ ] Add backdrop fade

### [ ] Toast/Notification
- [ ] Add slide in animation
- [ ] Add slide out animation
- [ ] Add auto-dismiss animation

### [ ] Loading Spinner
- [ ] Already has spin animation
- [ ] Ensure smooth rotation

## Forms & Inputs

### [ ] Form Fields
- [ ] Input focus animation (already in CSS)
- [ ] Label color animation
- [ ] Error message animation
- [ ] Success animation

### [ ] Checkboxes/Radios
- [ ] Check animation
- [ ] Focus animation
- [ ] Hover effect

### [ ] Selects/Dropdowns
- [ ] Open/close animation
- [ ] Option hover animation
- [ ] Selection animation

## Tables & Lists

### [ ] Table Rows
- [ ] Row entrance with stagger
- [ ] Row hover animation
- [ ] Row selection animation
- [ ] Sorting animation

### [ ] Lists
- [ ] Item entrance with stagger
- [ ] Item hover effects
- [ ] Item removal animation
- [ ] Empty state animation

## Micro-interactions

### [ ] Success States
- [ ] Checkmark animation
- [ ] Success toast animation
- [ ] Badge animation

### [ ] Error States
- [ ] Error shake animation
- [ ] Error message slide in
- [ ] Error badge animation

### [ ] Loading States
- [ ] Skeleton animation
- [ ] Spinner animation
- [ ] Loading badge animation

### [ ] Empty States
- [ ] Fade in animation
- [ ] Icon animation
- [ ] Message animation

## Sections & Containers

### [ ] Hero Sections
- [ ] Keep existing wave animation
- [ ] Add text animations
- [ ] Add CTA button animations

### [ ] Feature Sections
- [ ] Wrap with `StaggerContainer`
- [ ] Add feature card animations
- [ ] Add icon animations

### [ ] Stats Sections
- [ ] Use `StatCard` components
- [ ] Add animated number counter
- [ ] Add progress bar animations

### [ ] CTA Sections
- [ ] Add text animations
- [ ] Add button animations
- [ ] Add background animations

## Special Pages

### [ ] 404 Page (`src/app/not-found.tsx`)
- [ ] Add animation to 404 text
- [ ] Add button animation
- [ ] Add background animation

### [ ] Error Page (`src/app/error.tsx`)
- [ ] Add error message animation
- [ ] Add retry button animation
- [ ] Add icon animation

### [ ] Loading Page (`src/app/loading.tsx`)
- [ ] Add loading skeleton
- [ ] Add spinner animation

## Testing Checklist

### [ ] Visual Testing
- [ ] Review all animations in browser
- [ ] Check animation timing feels natural
- [ ] Verify stagger delays are correct
- [ ] Ensure no visual bugs

### [ ] Performance Testing
- [ ] Check animations run at 60fps
- [ ] Monitor CPU usage during animations
- [ ] Check memory usage
- [ ] Test on mobile devices

### [ ] Accessibility Testing
- [ ] Verify `prefers-reduced-motion` support
- [ ] Test keyboard navigation with animations
- [ ] Check animation doesn't interfere with content
- [ ] Test screen reader compatibility

### [ ] Cross-browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### [ ] Device Testing
- [ ] Desktop (1920x1080+)
- [ ] Laptop (1366x768)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone)
- [ ] Low-end mobile (Android)

## Implementation Priority

### Priority 1 (High Impact)
- [x] Button animations
- [x] Navbar animations
- [ ] Page transitions
- [ ] List stagger animations
- [ ] Stat cards

### Priority 2 (Medium Impact)
- [ ] Hover effects on cards
- [ ] Form field animations
- [ ] Loading states
- [ ] Modal animations

### Priority 3 (Polish)
- [ ] Scroll animations
- [ ] Parallax effects
- [ ] Micro-interactions
- [ ] Easter eggs

## Notes

- Always test animations on mobile
- Keep animation duration 300-700ms
- Use stagger delays of 100ms between items
- Respect accessibility preferences
- Document any custom animations
- Get feedback from team members
- Iterate based on user feedback

## Completion Tracking

- Total tasks: ___ 
- Completed: ___
- In Progress: ___
- Not Started: ___
- Completion %: ___

---

**Last Updated:** June 15, 2026
**Status:** Ready for Implementation
