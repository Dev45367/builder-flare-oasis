// Centralized Theme Configuration
// Manage all theme colors from this single file

/**
 * Convert HEX to HSL values for CSS variables
 * @param hex - Hex color value (e.g., "#673147")
 * @returns HSL values as string (e.g., "332 35% 30%")
 */
function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Generate color variations based on primary color
 */
function generateColorVariations(primaryHex: string) {
  // Convert primary color to HSL
  const primaryHsl = hexToHsl(primaryHex);

  // Extract HSL values
  const hslMatch = primaryHsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!hslMatch) throw new Error("Invalid HSL format");

  const h = parseInt(hslMatch[1]);
  const s = parseInt(hslMatch[2]);
  const l = parseInt(hslMatch[3]);

  return {
    primary: primaryHsl,
    primaryForeground: l > 50 ? "0 0% 0%" : "0 0% 100%", // Auto contrast
    primaryHover: `${h} ${s}% ${Math.max(l - 10, 5)}%`, // Darker
    primaryLight: `${h} ${Math.max(s - 20, 10)}% ${Math.min(l + 20, 95)}%`, // Lighter
    primaryDark: `${h} ${Math.min(s + 10, 100)}% ${Math.max(l - 20, 5)}%`, // Darker variation
  };
}

// Primary brand color - Change this to update the entire theme
export const BRAND_COLOR = "#673147";

// Generate all color variations
const colorVariations = generateColorVariations(BRAND_COLOR);

// Theme Configuration Object
export const themeConfig = {
  colors: {
    // Primary brand colors
    primary: {
      main: BRAND_COLOR,
      hsl: colorVariations.primary,
      foreground: colorVariations.primaryForeground,
      hover: colorVariations.primaryHover,
      light: colorVariations.primaryLight,
      dark: colorVariations.primaryDark,
    },

    // Semantic colors
    destructive: {
      hsl: "0 84.2% 60.2%",
      foreground: "0 0% 98%",
    },

    // Light theme colors
    light: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      cardForeground: "222.2 84% 4.9%",
      popover: "0 0% 100%",
      popoverForeground: "222.2 84% 4.9%",
      secondary: "210 40% 96.1%",
      secondaryForeground: "222.2 47.4% 11.2%",
      muted: "210 40% 96.1%",
      mutedForeground: "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      accentForeground: "222.2 47.4% 11.2%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: colorVariations.primary,
      sidebar: {
        background: "0 0% 98%",
        foreground: "222.2 84% 4.9%",
        primary: colorVariations.primary,
        primaryForeground: colorVariations.primaryForeground,
        accent: "240 4.8% 95.9%",
        accentForeground: "222.2 84% 4.9%",
        border: "220 13% 91%",
        ring: colorVariations.primary,
      },
      admin: {
        nav: "0 0% 96%",
        navHover: "0 0% 92%",
        navActive: colorVariations.primary,
        card: "0 0% 100%",
        cardBorder: "214.3 31.8% 91.4%",
      },
    },

    // Dark theme colors
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 98%",
      popover: "240 10% 3.9%",
      popoverForeground: "0 0% 98%",
      secondary: "240 3.7% 15.9%",
      secondaryForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      accentForeground: "0 0% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: colorVariations.primary,
      sidebar: {
        background: "240 5.9% 10%",
        foreground: "240 4.8% 95.9%",
        primary: colorVariations.primary,
        primaryForeground: colorVariations.primaryForeground,
        accent: "240 3.7% 15.9%",
        accentForeground: "240 4.8% 95.9%",
        border: "240 3.7% 15.9%",
        ring: colorVariations.primary,
      },
      admin: {
        nav: "240 7% 8%",
        navHover: "240 5% 12%",
        navActive: colorVariations.primary,
        card: "240 6% 6%",
        cardBorder: "240 3.7% 15.9%",
      },
    },
  },

  // Additional theme properties
  radius: "0.75rem",

  // Animations
  animations: {
    fast: "0.2s",
    normal: "0.3s",
    slow: "0.5s",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
};

// Export individual values for easy access
export const colors = themeConfig.colors;
export const primaryColor = themeConfig.colors.primary;

// Utility function to get theme colors for a specific mode
export function getThemeColors(mode: "light" | "dark") {
  return {
    ...themeConfig.colors[mode],
    primary: themeConfig.colors.primary,
    destructive: themeConfig.colors.destructive,
  };
}

// CSS Custom Properties Generator
export function generateCSSVariables(mode: "light" | "dark") {
  const colors = getThemeColors(mode);

  return {
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--card": colors.card,
    "--card-foreground": colors.cardForeground,
    "--popover": colors.popover,
    "--popover-foreground": colors.popoverForeground,
    "--primary": colors.primary.hsl,
    "--primary-foreground": colors.primary.foreground,
    "--secondary": colors.secondary,
    "--secondary-foreground": colors.secondaryForeground,
    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,
    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,
    "--destructive": colors.destructive.hsl,
    "--destructive-foreground": colors.destructive.foreground,
    "--border": colors.border,
    "--input": colors.input,
    "--ring": colors.ring,
    "--radius": themeConfig.radius,
    "--sidebar-background": colors.sidebar.background,
    "--sidebar-foreground": colors.sidebar.foreground,
    "--sidebar-primary": colors.sidebar.primary,
    "--sidebar-primary-foreground": colors.sidebar.primaryForeground,
    "--sidebar-accent": colors.sidebar.accent,
    "--sidebar-accent-foreground": colors.sidebar.accentForeground,
    "--sidebar-border": colors.sidebar.border,
    "--sidebar-ring": colors.sidebar.ring,
    "--admin-nav": colors.admin.nav,
    "--admin-nav-hover": colors.admin.navHover,
    "--admin-nav-active": colors.admin.navActive,
    "--admin-card": colors.admin.card,
    "--admin-card-border": colors.admin.cardBorder,
  };
}

export default themeConfig;
