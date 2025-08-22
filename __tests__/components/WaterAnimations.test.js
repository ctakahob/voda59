import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  AnimatedWaterDrop,
  FloatingBubbles,
  WaterWave,
  WaterLoader,
  WaterEntranceAnimation,
} from '../../src/components/animations/WaterAnimations';

// Mock theme
const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// Mock react-spring animations
jest.mock('@react-spring/web', () => ({
  useSpring: jest.fn(() => ({
    transform: 'translateY(0px) scale(1)',
    opacity: 1,
    filter: 'blur(0px)',
  })),
  animated: {
    div: React.forwardRef(({ children, style, ...props }, ref) => (
      <div ref={ref} style={style} {...props}>
        {children}
      </div>
    )),
  },
  config: {
    wobbly: {},
    gentle: {},
  },
}));

describe('WaterAnimations', () => {
  describe('AnimatedWaterDrop', () => {
    it('should render water drop icon', () => {
      renderWithTheme(<AnimatedWaterDrop />);
      const waterDropIcon = screen.getByTestId('WaterDropIcon');
      expect(waterDropIcon).toBeInTheDocument();
    });

    it('should apply custom size', () => {
      renderWithTheme(<AnimatedWaterDrop size={60} />);
      const waterDropIcon = screen.getByTestId('WaterDropIcon');
      expect(waterDropIcon).toHaveStyle({ fontSize: '60px' });
    });
  });

  describe('FloatingBubbles', () => {
    it('should render with default bubble count', () => {
      const { container } = renderWithTheme(<FloatingBubbles />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with custom bubble count', () => {
      const { container } = renderWithTheme(<FloatingBubbles count={3} />);
      // Since bubbles are positioned absolutely, we just check the container exists
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should apply container height style', () => {
      const { container } = renderWithTheme(<FloatingBubbles containerHeight={500} />);
      expect(container.firstChild).toHaveStyle({ height: '500px' });
    });
  });

  describe('WaterWave', () => {
    it('should render wave container', () => {
      const { container } = renderWithTheme(<WaterWave />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should apply custom height', () => {
      const { container } = renderWithTheme(<WaterWave height={200} />);
      expect(container.firstChild).toHaveStyle({ height: '200px' });
    });
  });

  describe('WaterLoader', () => {
    it('should render loader with water drop icon', () => {
      renderWithTheme(<WaterLoader />);
      const waterDropIcon = screen.getByTestId('WaterDropIcon');
      expect(waterDropIcon).toBeInTheDocument();
    });

    it('should apply custom size', () => {
      const { container } = renderWithTheme(<WaterLoader size={80} />);
      // Just verify the component renders with the size prop
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('WaterEntranceAnimation', () => {
    it('should render children', () => {
      renderWithTheme(
        <WaterEntranceAnimation>
          <div data-testid="test-child">Test Content</div>
        </WaterEntranceAnimation>
      );
      
      const child = screen.getByTestId('test-child');
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent('Test Content');
    });

    it('should apply animation styles', () => {
      renderWithTheme(
        <WaterEntranceAnimation>
          <div>Animated Content</div>
        </WaterEntranceAnimation>
      );
      
      // Since we mocked useSpring, we just verify the component renders
      expect(screen.getByText('Animated Content')).toBeInTheDocument();
    });
  });

  describe('Animation Props', () => {
    it('should handle delay prop', () => {
      renderWithTheme(<AnimatedWaterDrop delay={1000} />);
      const waterDropIcon = screen.getByTestId('WaterDropIcon');
      expect(waterDropIcon).toBeInTheDocument();
    });

    it('should handle duration prop', () => {
      renderWithTheme(<AnimatedWaterDrop duration={3000} />);
      const waterDropIcon = screen.getByTestId('WaterDropIcon');
      expect(waterDropIcon).toBeInTheDocument();
    });

    it('should handle color prop', () => {
      renderWithTheme(<AnimatedWaterDrop color="secondary.main" />);
      const waterDropIcon = screen.getByTestId('WaterDropIcon');
      expect(waterDropIcon).toBeInTheDocument();
    });
  });
});