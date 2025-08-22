'use client';
import React, { useState, useEffect } from 'react';
import { useSpring, animated, useSpringValue, config } from '@react-spring/web';
import { Box, keyframes } from '@mui/material';
import { WaterDrop } from '@mui/icons-material';

// Water drop animation component
export const AnimatedWaterDrop = ({ 
  size = 40, 
  color = 'primary.main', 
  delay = 0,
  duration = 2000,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const dropAnimation = useSpring({
    from: { 
      transform: 'translateY(-20px) scale(0.8)', 
      opacity: 0.7,
      filter: 'blur(1px)'
    },
    to: { 
      transform: isHovered ? 'translateY(0px) scale(1.2)' : 'translateY(0px) scale(1)', 
      opacity: isHovered ? 1 : 0.9,
      filter: 'blur(0px)'
    },
    config: config.wobbly,
    delay,
  });

  const pulseAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.1)' });
        await next({ transform: 'scale(1)' });
      }
    },
    config: { duration: duration },
  });

  return (
    <animated.div
      style={dropAnimation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <animated.div style={pulseAnimation}>
        <WaterDrop 
          sx={{ 
            fontSize: size, 
            color: color,
            filter: 'drop-shadow(0 4px 8px rgba(25, 118, 210, 0.3))',
            transition: 'all 0.3s ease',
          }} 
        />
      </animated.div>
    </animated.div>
  );
};

// Floating water bubbles animation
export const FloatingBubbles = ({ count = 5, containerHeight = 400 }) => {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 2000,
    duration: Math.random() * 3000 + 2000,
    startX: Math.random() * 100,
  }));

  return (
    <Box 
      sx={{ 
        position: 'absolute', 
        width: '100%', 
        height: containerHeight,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {bubbles.map((bubble) => (
        <FloatingBubble key={bubble.id} {...bubble} containerHeight={containerHeight} />
      ))}
    </Box>
  );
};

const FloatingBubble = ({ size, delay, duration, startX, containerHeight }) => {
  const animation = useSpring({
    from: { 
      transform: `translateY(${containerHeight + 50}px) translateX(${startX}%)`,
      opacity: 0,
      scale: 0,
    },
    to: async (next) => {
      while (true) {
        // Slight horizontal drift for more natural movement
        const driftX = startX + (Math.random() - 0.5) * 10; // Reduced from 20 to 10 for less erratic movement
        await next({ 
          transform: `translateY(-50px) translateX(${driftX}%)`,
          opacity: 0.4, // Reduced opacity for subtler effect
          scale: 1,
        });
        await next({ 
          transform: `translateY(${containerHeight + 50}px) translateX(${startX}%)`,
          opacity: 0,
          scale: 0,
        });
      }
    },
    config: { 
      duration,
      easing: (t) => t * (2 - t), // Smooth easing function
    },
    delay,
  });

  return (
    <animated.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(25, 118, 210, 0.6), rgba(25, 118, 210, 0.2))', // Reduced opacity
        border: '1px solid rgba(25, 118, 210, 0.3)',
        backdropFilter: 'blur(1px)',
        ...animation,
      }}
    />
  );
};

// Water wave animation
export const WaterWave = ({ height = 100, color = 'rgba(25, 118, 210, 0.1)' }) => {
  const waveAnimation = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateX(100%)' });
        await next({ transform: 'translateX(-100%)' });
      }
    },
    config: { duration: 8000 },
  });

  const wave2Animation = useSpring({
    from: { transform: 'translateX(100%)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateX(-100%)' });
        await next({ transform: 'translateX(100%)' });
      }
    },
    config: { duration: 6000 },
  });

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height, 
        overflow: 'hidden',
        borderRadius: '50% 50% 0 0',
      }}
    >
      <animated.div
        style={{
          position: 'absolute',
          width: '200%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          borderRadius: '50%',
          ...waveAnimation,
        }}
      />
      <animated.div
        style={{
          position: 'absolute',
          width: '200%',
          height: '80%',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          borderRadius: '50%',
          opacity: 0.7,
          ...wave2Animation,
        }}
      />
    </Box>
  );
};

// Ripple effect animation
export const WaterRipple = ({ trigger, size = 200 }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setKey(prev => prev + 1);
    }
  }, [trigger]);

  const rippleAnimation = useSpring({
    from: { transform: 'scale(0)', opacity: 0.8 },
    to: { transform: 'scale(1)', opacity: 0 },
    config: config.gentle,
    reset: trigger,
    key,
  });

  return (
    <animated.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: '2px solid rgba(25, 118, 210, 0.6)',
        pointerEvents: 'none',
        ...rippleAnimation,
      }}
    />
  );
};

// Loading water animation
export const WaterLoader = ({ size = 60 }) => {
  const loaderAnimation = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'rotate(360deg)' });
      }
    },
    config: { duration: 2000 },
  });

  const waveAnimation = useSpring({
    from: { transform: 'translateY(20px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-5px)' });
        await next({ transform: 'translateY(20px)' });
      }
    },
    config: config.gentle,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <animated.div style={loaderAnimation}>
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            border: '3px solid rgba(25, 118, 210, 0.2)',
            borderTop: '3px solid rgba(25, 118, 210, 0.8)',
          }}
        />
      </animated.div>
      <animated.div
        style={{
          position: 'absolute',
          ...waveAnimation,
        }}
      >
        <WaterDrop sx={{ fontSize: size * 0.4, color: 'primary.main' }} />
      </animated.div>
    </Box>
  );
};

// Entrance animation for components
export const WaterEntranceAnimation = ({ children, delay = 0 }) => {
  const animation = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateY(50px) scale(0.95)',
      filter: 'blur(5px)'
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0px) scale(1)',
      filter: 'blur(0px)'
    },
    config: config.gentle,
    delay,
  });

  return (
    <animated.div style={animation}>
      {children}
    </animated.div>
  );
};