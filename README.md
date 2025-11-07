# 🎠 React Motion Slider

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-motion-slider.svg?style=flat-square)](https://www.npmjs.com/package/react-motion-slider)
[![npm downloads](https://img.shields.io/npm/dm/react-motion-slider.svg?style=flat-square)](https://www.npmjs.com/package/react-motion-slider)
[![license](https://img.shields.io/npm/l/react-motion-slider.svg?style=flat-square)](https://github.com/yourusername/react-motion-slider/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

A powerful, feature-rich React slider/carousel component with stunning 3D effects, auto-scroll, responsive breakpoints, and smooth touch gestures. Built with TypeScript and Framer Motion.

[Demo](#-demo) • [Installation](#-installation) • [Examples](#-examples) • [API](#-api-reference) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- 🎯 **TypeScript Support** - Full type safety out of the box
- 🔄 **Infinite Loop** - Seamless infinite scrolling
- 🎨 **Coverflow 3D Effect** - Beautiful 3D carousel with customizable depth
- 📱 **Fully Responsive** - Breakpoint-based configuration for all screen sizes
- 🤚 **Touch Gestures** - Smooth swipe support with smart scroll detection
- ⚡ **Auto-Scroll** - Built-in auto-play with pause on hover/focus
- 🌐 **RTL Support** - Perfect for Arabic, Hebrew, and other RTL languages
- 🎭 **Custom Animations** - Powered by Framer Motion for smooth transitions
- 🎨 **Highly Customizable** - Extensive styling and behavior options
- ♿ **Accessible** - Keyboard navigation and focus management
- 📦 **Lightweight** - Tree-shakeable and optimized for performance
- 🔧 **Imperative API** - Control slider programmatically via ref

---

## 📸 Demo

### Basic Slider
![Basic Slider Demo](./demos/basic-slider.gif)

### Coverflow Effect
![Coverflow Demo](./demos/coverflow.gif)

### Responsive Breakpoints
![Responsive Demo](./demos/responsive.gif)

---

## 📦 Installation

```bash
# npm
git clone <Repo Link>

```

## 🚀 Quick Start
```bash
import React from 'react';
import { Slider } from 'react-motion-slider';

function App() {
  const slides = [
    <div>Slide 1</div>,
    <div>Slide 2</div>,
    <div>Slide 3</div>,
  ];

  return (
    <Slider slidesToShow={3} gap={20} loop>
      {slides}
    </Slider>
  );
}

export default App;
```

## 📚 Examples
### 1. Basic Slider
```bash
<Slider slidesToShow={3} gap={20}>
  {slides.map((slide, index) => (
    <div key={index} className="slide">
      {slide}
    </div>
  ))}
</Slider>
```

### 2. Infinite Loop
```bash
<Slider slidesToShow={3} gap={20} loop>
  {slides}
</Slider>
```

### 3. Auto-Scroll with Pause on Hover
```bash
<Slider
  slidesToShow={3}
  gap={20}
  loop
  autoScroll
  autoScrollInterval={3000}
  pauseOnHover
>
  {slides}
</Slider>
```

### 4. Coverflow 3D Effect
```bash
<Slider
  slidesToShow={3}
  gap={0}
  loop
  coverflow
  coverflowOptions={{
    rotate: 50,
    depth: 100,
    stretch: 0,
    modifier: 1,
    slideShadows: true,
    centerSlideWidth: 60,
  }}
>
  {slides}
</Slider>
```

### 5. Responsive Breakpoints
```bash
<Slider
  slidesToShow={3}
  gap={0}
  loop
  coverflow
  coverflowOptions={{
    rotate: 50,
    depth: 100,
    stretch: 0,
    modifier: 1,
    slideShadows: true,
    centerSlideWidth: 60,
  }}
>
  {slides}
</Slider>
```

### 6. RTL Support
```bash
<Slider
  slidesToShow={3}
  gap={20}
  direction="rtl"
  language="ar"
  loop
>
  {arabicSlides}
</Slider>
```

## 📁 Project Structure

```text
├── src/
│   ├── slider/
│   │   ├── index.ts                 # Main exports
│   │   ├── Slider.tsx               # Main component
│   │   ├── types.ts                 # TypeScript types
│   │   ├── constants.ts             # Constants
│   │   ├── hooks/
│   │   │   ├── useAutoScroll.ts     # Auto-scroll logic
│   │   │   ├── useBreakpoints.ts    # Responsive logic
│   │   │   ├── useSliderNavigation.ts
│   │   │   ├── useSliderState.ts
│   │   │   └── useTouchDirection.ts # Touch detection
│   │   ├── utils/
│   │   │   ├── calculations.ts      # Math calculations
│   │   │   ├── coverflow.ts         # 3D effects
│   │   │   ├── slides.ts            # Slide management
│   │   │   └── touchDetection.ts    # Touch utilities
│   │   └── components/
│   │       ├── SliderTrack.tsx      # Track container
│   │       ├── SliderControls.tsx   # Navigation UI
│   │       └── SlideWrapper.tsx     # Slide wrapper
│   └── styles/
│       └── slider.css               # Default styles
├── examples/                        # Usage examples
└── docs/                            # Documentation
```

## 🌐 Browser Support
✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ iOS Safari 12+
✅ Android Chrome 80+

## 🎛️ API Reference
### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slidesToShow` | `number` | **Required** | Number of slides visible at once |
| `children` | `React.ReactNode[]` | **Required** | Array of slide elements |
| `gap` | `number` | `20` | Space between slides (pixels) |
| `loop` | `boolean` | `false` | Enable infinite loop |
| `direction` | `"ltr" \| "rtl"` | `"ltr"` | Slider direction |
