import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: "#050b14",
          900: "#08101f",
          800: "#111c30",
          700: "#17253f",
          600: "#1d2f58",
          500: "#2850a1",
          400: "#2c83ff",
          300: "#6ca8ff",
          200: "#9bc7ff",
          100: "#c7e0ff"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(44, 131, 255, 0.22)",
        panel: "0 20px 120px rgba(0,0,0,0.32)"
      },
      backgroundImage: {
        "cyber-gradient": "radial-gradient(circle at top left, rgba(44,131,255,0.15,1), transparent 40%), radial-gradient(circle at bottom right, rgba(120, 95, 255, 0.12), transparent 35%)"
      },
      animation: {
        // Fade animations
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-slow": "fadeIn 1s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
        
        // Slide animations
        "slide-in-up": "slideInUp 0.6s ease-out",
        "slide-in-down": "slideInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "slide-out-up": "slideOutUp 0.6s ease-in",
        
        // Scale animations
        "scale-in": "scaleIn 0.4s ease-out",
        "scale-in-slow": "scaleIn 0.8s ease-out",
        "scale-up": "scaleUp 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        
        // Bounce and wobble
        "bounce-soft": "bounceSoft 1s ease-in-out infinite",
        "wobble": "wobble 0.8s ease-in-out",
        "spin-slow": "spin 3s linear infinite",
        
        // Gradient and glow
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "float": "float 3s ease-in-out infinite",
        
        // Stagger animations
        "stagger-fade": "fadeIn 0.6s ease-out forwards",
        
        // Button animations
        "button-press": "buttonPress 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        // Fade keyframes
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        },
        
        // Slide keyframes
        slideInUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        slideInDown: {
          "0%": { transform: "translateY(-40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        slideInLeft: {
          "0%": { transform: "translateX(-40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        slideInRight: {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        slideOutUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-40px)", opacity: "0" }
        },
        
        // Scale keyframes
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        scaleUp: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.05)", opacity: "1" }
        },
        
        // Pulse and glow
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(56, 189, 248, 0.8)" }
        },
        glowPulse: {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(44, 131, 255, 0.3), inset 0 0 20px rgba(44, 131, 255, 0.1)",
            opacity: "1"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(44, 131, 255, 0.6), inset 0 0 30px rgba(44, 131, 255, 0.2)",
            opacity: "1"
          }
        },
        
        // Bounce
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        wobble: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" }
        },
        
        // Shimmer
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        },
        
        // Float
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        
        // Button press
        buttonPress: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" }
        }
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      transitionDuration: {
        350: "350ms",
        400: "400ms"
      }
    }
  },
  plugins: []
};

export default config;
