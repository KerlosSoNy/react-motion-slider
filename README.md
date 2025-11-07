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

## 🧩 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| **slidesToShow** | `number` | **Required** | Number of slides visible at once |
| **children** | `React.ReactNode[]` | **Required** | Array of slide elements |
| **gap** | `number` | `20` | Space between slides (pixels) |
| **loop** | `boolean` | `false` | Enable infinite loop |
| **direction** | `"ltr"` \| `"rtl"` | `"ltr"` | Slider direction |
| **language** | `string` | `"en"` | Language code for localization |
| **isCenter** | `boolean` | `false` | Center the active slide |
| **isHidden** | `boolean` | `false` | Hide overflow content |
| **breakpoints** | `Breakpoints` | `{}` | Responsive breakpoint configuration |
| **slideClassName** | `string` | `""` | CSS class for slides |
| **slideStyle** | `React.CSSProperties` | `{}` | Inline styles for slides |
| **getSlideClassName** | `(index, isActive) => string` | `-` | Dynamic class name function |
| **getSlideStyle** | `(index, isActive) => CSSProperties` | `-` | Dynamic style function |
| **renderSlide** | `(slide, index, isActive, realIndex) => ReactNode` | `-` | Custom slide renderer |

## 🎛️ Coverflow Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| **coverflow** | `boolean` | `false` | Enable coverflow 3D effect |
| **coverflowOptions.rotate** | `number` | `50` | Rotation angle (degrees) |
| **coverflowOptions.depth** | `number` | `100` | Z-axis depth (pixels) |
| **coverflowOptions.stretch** | `number` | `0` | Slide stretch amount |
| **coverflowOptions.modifier** | `number` | `1` | Effect intensity modifier |
| **coverflowOptions.slideShadows** | `boolean` | `true` | Enable slide shadows |
| **coverflowOptions.centerSlideWidth** | `number` | `95` | Center slide width (%) |


## 🔁 Auto-Scroll Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| **autoScroll** | `boolean` | `false` | Enable auto-scrolling |
| **autoScrollInterval** | `number` | `3000` | Interval between scrolls (ms) |
| **autoScrollDirection** | `"next"` \| `"prev"` | `"next"` | Auto-scroll direction |
| **pauseOnHover** | `boolean` | `true` | Pause on mouse hover |
| **pauseOnFocus** | `boolean` | `true` | Pause on focus |


## 🧠 Event Callbacks

| Prop | Type | Description |
|------|------|-------------|
| **onSlideChange** | `(index: number) => void` | Called when the active slide changes |
| **onSlideNext** | `(current: number, next: number) => void` | Called before moving to the next slide |
| **onSlidePrev** | `(current: number, prev: number) => void` | Called before moving to the previous slide |


## 📜 License

MIT © [Kerlos Magdy](https://github.com/KerlosSoNy)

---

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) – For awesome animations  
- [React](https://reactjs.org/) – The best UI library  
- [TypeScript](https://www.typescriptlang.org/) – For type safety  

---

## 📞 Support

🐛 Issues: [GitHub Issues](https://github.com/KerlosSoNy/react-motion-slider/issues)  
💬 Discussions: [GitHub Discussions](https://github.com/KerlosSoNy/react-motion-slider/discussions)  
📧 Email: [Kerlosssony@gmail.com](mailto:Kerlosssony@gmail.com)


## 🎯 Roadmap

- [ ] Vertical slider support  
- [ ] Thumbnail navigation  
- [ ] Video slide support  
- [ ] Lazy loading built-in  
- [ ] Fade transition effect  
- [ ] Parallax effect  
- [ ] Multiple slides per move  
- [ ] Accessible keyboard shortcuts  


---

<p align="center">
  <a href="#top">↑ back to top</a>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/KerlosSoNy">Kerlos Magdy</a>
</p>

<p align="center">
  If this project helped you, please consider giving it a ⭐!
</p>

<p align="center">
  <a href="[https://github.com/YourRepo](https://github.com/KerlosSoNy/react-motion-slider)">
    <img src="https://img.shields.io/github/stars/KerlosSoNy/react-motion-slider?style=social" alt="GitHub Repo Stars"/>
  </a>
</p>
