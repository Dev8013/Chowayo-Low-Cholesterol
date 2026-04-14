# IMPACT - Interactive Visual Trigger

A minimalist, high-impact interactive visualizer built with React, Tailwind CSS, and Framer Motion. This project features a full-screen video experience that reacts to user interaction with synchronized audio and visual feedback.

## 🚀 Live Demo

Experience the interactive visualizer here:
**[View Live Demo](https://ais-pre-qs5vssbfsemhp2d2bos2xw-775887801541.asia-southeast1.run.app)**

*(Note: Click anywhere on the screen to trigger the impact effect)*

## ✨ Features

- **Immersive Full-Screen Experience**: Edge-to-edge video playback.
- **Interactive Triggers**: Left-click to play/restart the visual and audio sequence.
- **Synchronized Audio**: High-fidelity sound effects paired with visual movement.
- **Custom Cursor**: Branded mouse pointer for a cohesive aesthetic.
- **Robust Fallbacks**: Automatic GIF and audio fallbacks if local assets fail to load.
- **Technical UI Overlay**: A minimalist status bar and frame counter for a "system" feel.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion (motion/react)](https://www.framer.com/motion/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/impact-visualizer.git
   cd impact-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add your assets**:
   Place your custom media in the `public/` directory:
   - `video.mp4`: The main background video.
   - `sound.mp3`: The trigger sound effect.
   - `mousePointer.png`: Your custom cursor image.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Customization

You can easily modify the theme and colors in `src/index.css`:

```css
@theme {
  --color-accent: #e0f200; /* Impact yellow */
  --color-bg: #080808;    /* Deep black */
}
```

## 📄 License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

---

Built with ⚡ by [Your Name/GitHub](https://github.com/Dev8013)
