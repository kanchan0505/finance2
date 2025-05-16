"use client";
import * as React from "react";
import { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { ThemeContext } from "./ThemeProvider";

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const { theme, colorScheme } = useContext(ThemeContext);

  // Map Tailwind colors for cursor (based on globals.css)
  const textColors = {
    light: { primary: "#171717", secondary: "#6B7280" }, // --foreground, --text-secondary
    dark: { primary: "#EDEDED", secondary: "#9CA3AF" }, // --foreground, --text-secondary
  };

  // Map colorScheme to hex codes (matching ThemeProvider.jsx)
  const cursorColors = {
    blue: { primary: "#3B82F6", hover: "#60A5FA" },
    green: { primary: "#10B981", hover: "#34D399" },
    purple: { primary: "#8B5CF6", hover: "#A78BFA" },
    orange: { primary: "#F97316", hover: "#FB923C" },
    teal: { primary: "#14B8A6", hover: "#2DD4BF" },
  };

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    // Initial positions and opacity
    gsap.set(cursorDot, { x: 0, y: 0, opacity: 0 });
    gsap.set(cursorOutline, { x: 0, y: 0, opacity: 0 });

    // Fade-in effect
    const handleMouseEnterViewport = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    // Fade-out effect
    const handleMouseLeaveViewport = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursorDot, { x: clientX, y: clientY, duration: 0 });
      gsap.to(cursorOutline, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Click animation (skip for .theme-changer)
    const handleMouseDown = (e) => {
      if (e.target.closest(".theme-changer")) return; // Skip animation
      e.stopPropagation();
      console.log("Mouse down on:", e.target);
      gsap.to(cursorDot, {
        scale: 0.8,
        opacity: 0.6,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(cursorOutline, {
        scale: 0.9,
        opacity: 0.6,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseUp = (e) => {
      if (e.target.closest(".theme-changer")) return; // Skip animation
      e.stopPropagation();
      console.log("Mouse up on:", e.target);
      gsap.to(cursorDot, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(cursorOutline, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .sidebar-item, .theme-changer'
    );

    const handleMouseEnter = (e) => {
      console.log("Hover on:", e.target);
      gsap.to(cursorDot, {
        scale: 1.5,
        backgroundColor: cursorColors[colorScheme].hover,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorOutline, {
        scale: 1.5,
        borderColor: cursorColors[colorScheme].hover,
        borderWidth: "3px",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: textColors[theme].primary,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorOutline, {
        scale: 1,
        borderColor: textColors[theme].secondary,
        borderWidth: "2px",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnterViewport);
    document.addEventListener("mouseleave", handleMouseLeaveViewport);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnterViewport);
      document.removeEventListener("mouseleave", handleMouseLeaveViewport);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      document.body.style.cursor = "auto";
    };
  }, [theme, colorScheme]);

  return (
    <>
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: textColors[theme].primary,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={cursorOutlineRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "24px",
          height: "24px",
          border: `2px solid ${textColors[theme].secondary}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
