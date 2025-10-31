# LISTO UX Wireframe Layout Recommendations

## Executive Summary
This document provides comprehensive wireframe layouts and UX design recommendations for LISTO, a neurodivergent-friendly productivity and wellness app. The designs prioritize clarity, accessibility, reduced cognitive load, and intuitive navigation while maintaining a modern, premium aesthetic.

---

## Design Principles for Neurodivergent Users

### Core Principles
1. **Cognitive Load Reduction** - Minimize decisions and overwhelming choices
2. **Clear Visual Hierarchy** - Important elements stand out immediately
3. **Consistent Patterns** - Predictable layouts and interactions
4. **Forgiving Interactions** - Easy undo, auto-save, clear error recovery
5. **Time Awareness** - Visual time indicators and gentle reminders
6. **Executive Function Support** - Break complex tasks into steps
7. **Sensory Considerations** - Calming colors, optional reduced motion
8. **Flexible Pacing** - Users control the speed of interaction

---

## 🏠 Homepage Wireframe

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER                                                              │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ [LOGO: LISTO]    Wellness  Medical  Meal  Vision  Explore        ││
│ │                                            [Search] [Login] [Cart]││
│ └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                         │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │  [Animated Background - Subtle Gradients]                       ││
│ │                                                                  ││
│ │     Good morning, Welcome back! ✨                              ││
│ │                                                                  ││
│ │              L  I  S  T  O                                      ││
│ │         [Gradient Text Effect]                                  ││
│ │                                                                  ││
│ │    Your neurodivergent-friendly companion for                   ││
│ │    growth, wellness, and meaningful connections                 ││
│ │                                                                  ││
│ │  ┌──────────────────────────────────────────┐                  ││
│ │  │  Get Started Today                       │                  ││
│ │  │  ┌────────────────────────────────────┐  │                  ││
│ │  │  │ [📧] Enter your email             │  │                  ││
│ │  │  └────────────────────────────────────┘  │                  ││
│ │  │  ┌────────────────────────────────────┐  │                  ││
│ │  │  │ [▼] Select a plan                 │  │                  ││
│ │  │  └────────────────────────────────────┘  │                  ││
│ │  │  [ ] I agree to Terms & Conditions       │                  ││
│ │  │  ┌────────────────────────────────────┐  │                  ││
│ │  │  │  Start Your Journey  →             │  │                  ││
│ │  │  └────────────────────────────────────┘  │                  ││
│ │  └──────────────────────────────────────────┘                  ││
│ └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│ FEATURE CARDS SECTION                                               │
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │
│ │ [❤️ Icon]        │ │ [🧠 Icon]        │ │ [✨ Icon]        │ │
│ │ Wellness Hub      │ │ Medical Hub       │ │ Vision Board      │ │
│ │                   │ │                   │ │                   │ │
│ │ Track mental      │ │ Manage appoint-   │ │ Create visual     │ │
│ │ health, mood...   │ │ ments, meds...    │ │ goal maps...      │ │
│ │                   │ │                   │ │                   │ │
│ │ • Privacy-first   │ │ • Smart reminders │ │ • Visual mapping  │ │
│ │ • Personal goals  │ │ • Appointments    │ │ • AI inspiration  │ │
│ │ • Peer support    │ │ • Health insights │ │ • Motivation      │ │
│ │                   │ │                   │ │                   │ │
│ │ [Explore →]       │ │ [Access →]        │ │ [Create →]        │ │
│ └───────────────────┘ └───────────────────┘ └───────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│ COMMUNITY IMPACT SECTION                                            │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │    Community Impact                                             ││
│ │    Real metrics from our thriving neurodivergent community      ││
│ │                                                                  ││
│ │  ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐                      ││
│ │  │12.4k│    │8.9k │    │24.7k│    │156k │                      ││
│ │  │Focus│    │Goals│    │Comm.│    │Grow.│                      ││
│ │  │Sess.│    │Achv.│    │Supp.│    │Mom. │                      ││
│ │  └─────┘    └─────┘    └─────┘    └─────┘                      ││
│ └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                              │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ LISTO               Navigation          Stay Updated            ││
│ │ Your companion...   Wellness Hub        Subscribe for tips     ││
│ │                     Medical Hub         [Email] [Subscribe]    ││
│ │                     Meal Planner                                ││
│ │                     Vision Board                                ││
│ │                                                                  ││
│ │ ───────────────────────────────────────────────────────────     ││
│ │               © 2025 LISTO. All rights reserved.                ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ [🔵 Floating Action Button - Break Reminder]                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Key UX Elements:
- **F-Pattern Layout**: Natural eye movement from top-left
- **Progressive Disclosure**: Most important info first
- **Clear CTAs**: Contrasting colors, action-oriented text
- **Visual Hierarchy**: Size and spacing guide attention
- **Whitespace**: Generous spacing prevents overwhelm

---

## 📊 Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER (Sticky)                                                     │
│ [≡] LISTO    Dashboard  Health  Tasks  Goals         [🔍] [🔔] [👤] │
├─────────────────────────────────────────────────────────────────────┤
│ WELCOME BANNER                                                      │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ Good afternoon, Alex! 🌤️                                       ││
│ │ Your energy level today: ⚡⚡⚡⚡○ (High)                         ││
│ │ Next task: Review meal plan • In 25 minutes                     ││
│ └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT (2-Column Layout)                                      │
│ ┌────────────────────────────────┐ ┌─────────────────────────────┐ │
│ │ TODAY'S FOCUS                  │ │ QUICK ACTIONS              │ │
│ │ ┌────────────────────────────┐ │ │ ┌─────────────────────────┐ │
│ │ │ ✓ Morning meditation       │ │ │ │ [+] Add Task           │ │
│ │ │ ○ Review emails (10 min)   │ │ │ │ [📅] Schedule          │ │
│ │ │ ○ Meal prep                │ │ │ │ [💊] Log Medication    │ │
│ │ │   [Start Timer 🕐]         │ │ │ │ [🎯] Quick Goal        │ │
│ │ └────────────────────────────┘ │ │ └─────────────────────────┘ │
│ │                                │ │                             │ │
│ │ ENERGY TIMELINE                │ │ WELLNESS SNAPSHOT          │ │
│ │ ┌────────────────────────────┐ │ │ ┌─────────────────────────┐ │
│ │ │ 9AM  ████████              │ │ │ │ Mood: 😊 Good          │ │
│ │ │ 12PM ██████     [You]      │ │ │ │ Water: 💧💧💧○○○      │ │
│ │ │ 3PM  █████████             │ │ │ │ Sleep: 7.5h            │ │
│ │ │ 6PM  ████                  │ │ │ │ Steps: 4,231           │ │
│ │ └────────────────────────────┘ │ │ └─────────────────────────┘ │
│ └────────────────────────────────┘ └─────────────────────────────┘ │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ PROGRESS THIS WEEK                                              ││
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                            ││
│ │ │ 18/20│ │ 5/7  │ │ 12/14│ │  3  │                            ││
│ │ │ Tasks│ │ Goals│ │ Habit│ │Level│                            ││
│ │ └──────┘ └──────┘ └──────┘ └──────┘                            ││
│ └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Key UX Features:
- **Personalized Greeting**: Time-aware, includes user name
- **Energy Awareness**: Visual energy level indicator
- **Prioritized Tasks**: "Today's Focus" limits overwhelm
- **Quick Actions**: One-tap access to common tasks
- **Progress Visualization**: Clear, motivating metrics
- **Timeline View**: Helps with time blindness

---

## 🍽️ Meal Planner Wireframe

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER                                                              │
│ [←] Meal Planner            [Calendar View] [List View] [Shopping] │
├─────────────────────────────────────────────────────────────────────┤
│ ADHD HELPER PANEL (Collapsible)                                    │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ 🎯 Focus Helper                                                 ││
│ │ • Break meal prep into 5-minute chunks                          ││
│ │ • Use visual timers for each step                               ││
│ │ • Prep ingredients night before                                 ││
│ │ [Show me how] [Dismiss]                                         ││
│ └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│ WEEKLY MEAL CALENDAR                                                │
│ ┌───────┬───────┬───────┬───────┬───────┬───────┬───────┐          │
│ │  MON  │  TUE  │  WED  │  THU  │  FRI  │  SAT  │  SUN  │          │
│ ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤          │
│ │ B: Oat│ B: Egg│ B: Smoo│B: Yog │B: Toast│B: Panca│B: Burri│      │
│ │ [IMG] │ [IMG] │ [IMG]  │ [IMG] │ [IMG]  │ [IMG]  │ [IMG]  │      │
│ │       │       │        │       │        │        │        │      │
│ │ L: Salad L: Wrap│L: Soup │L: Left│L: Sand │L: Pizza│L: Bowl│      │
│ │ [IMG] │ [IMG] │ [IMG]  │ [IMG] │ [IMG]  │ [IMG]  │ [IMG]  │      │
│ │       │       │        │       │        │        │        │      │
│ │ D: Chick│D: Pasta│D: Tacos│D: Salm│D: Curry│D: Stir │D: Casss│    │
│ │ [IMG] │ [IMG] │ [IMG]  │ [IMG] │ [IMG]  │ [IMG]  │ [IMG]  │      │
│ │ [15min]│[20min]│[25min] │[30min]│[35min] │[20min] │[40min] │      │
│ └───────┴───────┴───────┴───────┴───────┴───────┴───────┘          │
│                                                                     │
│ [🔄 Generate New Plan] [+ Add Custom Meal] [📋 View Shopping List] │
├─────────────────────────────────────────────────────────────────────┤
│ MEAL DETAILS (Right Panel - Slide-in)                              │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ [×] Grilled Chicken Salad                      [❤️] [🔖] [⋯]   ││
│ │ ┌─────────────────────────────────────────────────────────────┐││
│ │ │ [Large Image of Meal]                                       │││
│ │ └─────────────────────────────────────────────────────────────┘││
│ │                                                                 ││
│ │ ⏱️ Prep Time: 15 minutes    🔥 Difficulty: Easy                ││
│ │ 🧠 ADHD-Friendly: High      🥗 Healthy: 9/10                   ││
│ │                                                                 ││
│ │ INGREDIENTS (with visual checklist)                            ││
│ │ [ ] Chicken breast (200g)     [ ] Mixed greens (2 cups)        ││
│ │ [ ] Cherry tomatoes (10)      [ ] Olive oil (2 tbsp)           ││
│ │ [ ] Lemon (1)                 [ ] Salt & pepper                ││
│ │                                                                 ││
│ │ STEP-BY-STEP (with timers for each)                            ││
│ │ 1. [▶️ 2min] Season chicken with salt, pepper                  ││
│ │ 2. [▶️ 8min] Grill chicken until cooked through                ││
│ │ 3. [▶️ 3min] Mix greens, tomatoes, dressing                    ││
│ │ 4. [▶️ 2min] Slice chicken, add to salad                       ││
│ │                                                                 ││
│ │ [🛒 Add to Shopping List] [📅 Schedule for Tomorrow]           ││
│ └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Key UX Features:
- **ADHD Helper Panel**: Contextual executive function support
- **Visual Calendar**: Pictures for each meal (reduces decision fatigue)
- **Time Indicators**: Clear time estimates for planning
- **Step Timers**: Built-in timers for each cooking step
- **Visual Checklist**: Check off ingredients as you go
- **Energy-Based Suggestions**: Matches meal complexity to energy levels

---

## 🏥 Medical Hub Wireframe

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER                                                              │
│ [←] Medical Hub         [Dashboard] [Calendar] [Meds] [Appointments]│
├─────────────────────────────────────────────────────────────────────┤
│ URGENT ALERTS (If any)                                              │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ ⚠️ Take Medication: Vitamin D - Due 10 minutes ago [Take Now]  ││
│ │ 📅 Appointment Reminder: Dr. Smith tomorrow at 2 PM [Details]  ││
│ └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│ MAIN DASHBOARD (3-Column Grid)                                      │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │
│ │ TODAY'S MEDS    │ │ UPCOMING APPTS  │ │ HEALTH TRACKING │       │
│ │ ┌─────────────┐ │ │ ┌─────────────┐ │ │ ┌─────────────┐ │       │
│ │ │ ✓ Medication│ │ │ │ Thu, Nov 2  │ │ │ │ Mood Today  │ │       │
│ │ │   8:00 AM   │ │ │ │ Dr. Smith   │ │ │ │ 😊 😐 😟   │ │       │
│ │ │             │ │ │ │ 2:00 PM     │ │ │ │ [Select]    │ │       │
│ │ │ ○ Medication│ │ │ │ [Directions]│ │ │ └─────────────┘ │       │
│ │ │   12:00 PM  │ │ │ └─────────────┘ │ │ ┌─────────────┐ │       │
│ │ │   [Remind]  │ │ │                 │ │ │ Symptoms    │ │       │
│ │ │             │ │ │ Fri, Nov 3      │ │ │ [+ Add]     │ │       │
│ │ │ ○ Medication│ │ │ Lab Work        │ │ └─────────────┘ │       │
│ │ │   8:00 PM   │ │ │ 9:00 AM         │ │ ┌─────────────┐ │       │
│ │ │   [Remind]  │ │ │ [Details]       │ │ │ Water       │ │       │
│ │ └─────────────┘ │ │                 │ │ │ 💧💧💧○○  │ │       │
│ │                 │ │                 │ │ │ 3/8 glasses │ │       │
│ │ [+ Add Med]     │ │ [+ New Appt]    │ │ └─────────────┘ │       │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘       │
├─────────────────────────────────────────────────────────────────────┤
│ MEDICATION CORRELATION INSIGHTS                                     │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ 📊 AI Insights                                                  ││
│ │ "Your mood improved 20% after starting Medication X"            ││
│ │ "Sleep quality correlates with evening medication timing"       ││
│ │ [View Full Report]                                              ││
│ └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│ HEALTH TIMELINE (Visual)                                            │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ Oct 1  Oct 8   Oct 15  Oct 22  Oct 29  [Today]                 ││
│ │  ●──────●───────●───────●───────●───────●                       ││
│ │  Apt.   Med    Symptom  Lab    Med      Apt.                   ││
│ │                                                                  ││
│ │ [View Full History]                                             ││
│ └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Key UX Features:
- **Urgent Alerts**: Critical info always visible at top
- **Today's Focus**: Only show what's needed now
- **Visual Medication Tracker**: Check off as taken
- **Smart Reminders**: Contextual, not annoying
- **AI Insights**: Correlations between meds and health
- **Timeline View**: Visual history of health events
- **One-Tap Actions**: Quick medication logging

---

## 📱 Mobile-First Considerations

### Navigation Pattern: Bottom Tab Bar
```
┌────────────────────────┐
│                        │
│   [Content Area]       │
│                        │
│                        │
├────────────────────────┤
│ [🏠] [❤️] [📅] [👤]   │
│ Home  Well  Cal. Profile│
└────────────────────────┘
```

### Mobile Gestures:
- **Swipe Right**: Go back
- **Swipe Left**: Next item
- **Pull Down**: Refresh
- **Long Press**: Quick actions menu
- **Pinch**: Zoom (where applicable)

### Touch Targets:
- Minimum 44x44px (iOS standard)
- Generous spacing between tappable elements
- Clear active/pressed states

---

## 🎨 Component Library

### Button Styles
```
┌──────────────────────┐
│  Primary Button      │  Large, gradient background
└──────────────────────┘  High-contrast text

┌──────────────────────┐
│  Secondary Button    │  Outline style
└──────────────────────┘  Lower visual weight

┌──────────────────────┐
│  Tertiary Button     │  Text-only, subtle
└──────────────────────┘  Minimal visual impact

[🔵 Icon Button]          Circular, icon only
```

### Card Styles
```
┌─────────────────────────┐
│ Card Title              │  Standard elevation
│ ─────────────────────   │  Rounded corners
│ Content here...         │  Padding: 24px
│                         │
│ [Action Button]         │
└─────────────────────────┘

┌─────────────────────────┐
│ [Icon] Feature Card     │  Interactive card
│ ─────────────────────   │  Hover effects
│ Description...          │  Click/tap whole card
│ • Benefit 1             │
│ • Benefit 2             │
│ [Learn More →]          │
└─────────────────────────┘
```

### Form Elements
```
┌──────────────────────────┐
│ [Label]                  │  Clear labels above
│ ┌────────────────────┐   │  Helpful placeholder
│ │ Placeholder text   │   │  Validation feedback
│ └────────────────────┘   │  Error messages inline
└──────────────────────────┘

┌──────────────────────────┐
│ [✓] Checkbox Label       │  Large touch target
└──────────────────────────┘  Clear label

( ) Radio Option 1          │  Grouped logically
(●) Radio Option 2          │  One selected
( ) Radio Option 3          │  Visual hierarchy
```

---

## ♿ Accessibility Patterns

### Screen Reader Structure
```
<main>
  <h1>Page Title</h1>
  <nav aria-label="Main navigation">...</nav>
  <section aria-labelledby="section-title">
    <h2 id="section-title">Section Title</h2>
    ...
  </section>
</main>
```

### Keyboard Navigation
- **Tab**: Move forward through interactive elements
- **Shift + Tab**: Move backward
- **Enter/Space**: Activate buttons/links
- **Escape**: Close modals/dropdowns
- **Arrow Keys**: Navigate within components (dropdowns, tabs)

### Focus Indicators
```
Default state:  ┌──────────┐
                │  Button  │
                └──────────┘

Focused state:  ┏━━━━━━━━━━┓
                ┃  Button  ┃
                ┗━━━━━━━━━━┛
                (Visible outline, high contrast)
```

---

## 🎭 Animation Guidelines

### Motion Principles
1. **Purposeful**: Animations guide attention or provide feedback
2. **Subtle**: Not distracting or overwhelming
3. **Fast**: 200-300ms for most transitions
4. **Respectful**: Respect `prefers-reduced-motion`

### Animation Examples
```
Fade In:      Opacity 0 → 1 (300ms)
Slide In:     TranslateY 20px → 0 (250ms)
Scale:        Scale 0.95 → 1 (200ms)
Hover Lift:   TranslateY 0 → -2px (150ms)
Button Press: Scale 1 → 0.98 (100ms)
```

### Reduced Motion Alternative
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📐 Spacing System

### 8px Grid System
```
4px   - Tight spacing (between related elements)
8px   - Default spacing
16px  - Comfortable spacing
24px  - Section spacing
32px  - Large section spacing
48px  - Major section spacing
64px  - Extra large spacing
```

### Responsive Spacing
```
Mobile:   16px padding
Tablet:   24px padding
Desktop:  32px padding
Wide:     48px padding
```

---

## 🎨 Color System

### Primary Colors
```
Emerald:  #10b981  (Wellness, growth)
Blue:     #3b82f6  (Medical, trust)
Purple:   #8b5cf6  (Creativity, vision)
```

### Semantic Colors
```
Success:  #22c55e  (Green)
Warning:  #f59e0b  (Orange)
Error:    #ef4444  (Red)
Info:     #3b82f6  (Blue)
```

### Neutrals
```
Gray 50:  #f9fafb  (Backgrounds)
Gray 100: #f3f4f6
Gray 600: #4b5563  (Text)
Gray 900: #111827  (Headings)
```

---

## 📱 Responsive Breakpoints

```
Mobile:     320px - 640px
Tablet:     641px - 1024px
Desktop:    1025px - 1440px
Wide:       1441px+
```

### Layout Changes by Breakpoint
```
Mobile:     1 column, stacked
Tablet:     2 columns, mixed
Desktop:    3 columns, full features
Wide:       3-4 columns, spacious
```

---

## 🧩 Component States

### Interactive States
```
Default:    Normal appearance
Hover:      Subtle highlight (desktop only)
Active:     Pressed appearance
Focus:      Visible focus ring
Disabled:   50% opacity, no interaction
Loading:    Spinner or skeleton screen
Error:      Red outline, error message
Success:    Green outline, check icon
```

---

## 💡 Best Practices Summary

### Do:
✅ Use clear, action-oriented button labels
✅ Provide immediate visual feedback
✅ Use consistent patterns throughout
✅ Test with screen readers
✅ Provide undo/redo where possible
✅ Auto-save user data frequently
✅ Use descriptive error messages
✅ Include helpful tooltips
✅ Make touch targets large enough
✅ Respect user preferences (reduced motion, dark mode)

### Don't:
❌ Use ambiguous labels ("Click here", "Submit")
❌ Rely solely on color to convey meaning
❌ Auto-play audio or video
❌ Use tiny fonts (<16px for body text)
❌ Create overly complex navigation
❌ Interrupt user flow unnecessarily
❌ Hide important actions in submenus
❌ Use ALL CAPS for long text
❌ Create time-based interactions (timeouts)
❌ Forget about keyboard users

---

## 🔄 Iteration & Testing

### User Testing Checklist
- [ ] Can users complete key tasks without help?
- [ ] Are error messages clear and helpful?
- [ ] Do users understand where they are in the app?
- [ ] Are loading states clear?
- [ ] Do animations enhance or distract?
- [ ] Is navigation intuitive?
- [ ] Are forms easy to complete?
- [ ] Do users feel in control?

### Neurodivergent User Testing
- [ ] Test with ADHD users for focus/distraction
- [ ] Test with autistic users for sensory considerations
- [ ] Test with users who have executive dysfunction
- [ ] Test with users who have time blindness
- [ ] Gather feedback on cognitive load
- [ ] Validate accessibility features

---

*This wireframe document should be used as a foundation for design and development. Iterate based on user feedback and usability testing.*

*Last Updated: October 2025*
