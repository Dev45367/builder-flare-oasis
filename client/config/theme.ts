// Centralized Theme Configuration
// Comprehensive burgundy/wine color palette for admin panel

/**
 * Convert HEX to HSL values for CSS variables
 * @param hex - Hex color value (e.g., "#7B2D26")
 * @returns HSL values as string (e.g., "8 52% 32%")
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

// ✅ Light Mode Color Palette
export const lightColors = {
  primary: "#7B2D26", // Deep Burgundy - Buttons, accents
  accent: "#F7E8C9", // Champagne - Secondary CTAs, badges
  background: "#FDF9F4", // Ivory - Main background
  cardBackground: "#FFFFFF", // Warm White - Panels, containers
  textPrimary: "#1C1C1C", // Charcoal - Headers, body text
  textSecondary: "#5E5E5E", // Slate - Descriptions, notes
  success: "#3BB273", // Emerald - Positive states
  warning: "#FFC107", // Amber - Alerts, notices
  error: "#D72638", // Crimson - Errors, danger alerts
  divider: "#E4E4E4", // Soft Gray - Borders, lines
};

// 🌙 Dark Mode Color Palette
export const darkColors = {
  primary: "#9E2A2B", // Wine Red - Buttons, links
  accent: "#D4AF7F", // Golden Beige - Highlights, buttons
  background: "#121212", // Rich Black - Main BG
  cardBackground: "#1E1E1E", // Charcoal Gray - Panels, list containers
  textPrimary: "#F5F5F5", // Light Beige - Main text
  textSecondary: "#B0B0B0", // Muted Gray - Descriptions
  success: "#00C851", // Deep Green - Success badge
  warning: "#FFC400", // Golden Amber - Caution
  error: "#FF4C4C", // Soft Red - Error states
  divider: "#3A3A3A", // Dim Gray - Lines
};

// Convert colors to HSL for CSS variables
const lightHsl = {
  primary: hexToHsl(lightColors.primary), // 8 52% 32%
  accent: hexToHsl(lightColors.accent), // 39 73% 88%
  background: hexToHsl(lightColors.background), // 37 71% 97%
  cardBackground: hexToHsl(lightColors.cardBackground), // 0 0% 100%
  textPrimary: hexToHsl(lightColors.textPrimary), // 0 0% 11%
  textSecondary: hexToHsl(lightColors.textSecondary), // 0 0% 37%
  success: hexToHsl(lightColors.success), // 141 50% 48%
  warning: hexToHsl(lightColors.warning), // 45 100% 52%
  error: hexToHsl(lightColors.error), // 348 71% 50%
  divider: hexToHsl(lightColors.divider), // 0 0% 89%
};

const darkHsl = {
  primary: hexToHsl(darkColors.primary), // 359 57% 39%
  accent: hexToHsl(darkColors.accent), // 39 49% 66%
  background: hexToHsl(darkColors.background), // 0 0% 7%
  cardBackground: hexToHsl(darkColors.cardBackground), // 0 0% 12%
  textPrimary: hexToHsl(darkColors.textPrimary), // 0 0% 96%
  textSecondary: hexToHsl(darkColors.textSecondary), // 0 0% 69%
  success: hexToHsl(darkColors.success), // 145 100% 39%
  warning: hexToHsl(darkColors.warning), // 48 100% 50%
  error: hexToHsl(darkColors.error), // 0 100% 64%
  divider: hexToHsl(darkColors.divider), // 0 0% 23%
};

// Theme Configuration Object
export const themeConfig = {
  colors: {
    // Light theme configuration
    light: {
      // Core colors
      background: lightHsl.background,
      foreground: lightHsl.textPrimary,
      card: lightHsl.cardBackground,
      cardForeground: lightHsl.textPrimary,
      popover: lightHsl.cardBackground,
      popoverForeground: lightHsl.textPrimary,

      // Primary branding
      primary: lightHsl.primary,
      primaryForeground: "0 0% 100%", // White text on burgundy

      // Secondary colors
      secondary: lightHsl.accent,
      secondaryForeground: lightHsl.textPrimary,

      // Muted colors
      muted: lightHsl.accent,
      mutedForeground: lightHsl.textSecondary,

      // Accent colors
      accent: lightHsl.accent,
      accentForeground: lightHsl.textPrimary,

      // Interactive elements
      border: lightHsl.divider,
      input: lightHsl.divider,
      ring: lightHsl.primary,

      // Semantic colors
      destructive: lightHsl.error,
      destructiveForeground: "0 0% 100%",
      success: lightHsl.success,
      successForeground: "0 0% 100%",
      warning: lightHsl.warning,
      warningForeground: lightHsl.textPrimary,

      // Sidebar specific
      sidebar: {
        background: lightHsl.background,
        foreground: lightHsl.textPrimary,
        primary: lightHsl.primary,
        primaryForeground: "0 0% 100%",
        accent: lightHsl.accent,
        accentForeground: lightHsl.textPrimary,
        border: lightHsl.divider,
        ring: lightHsl.primary,
      },

      // Admin panel specific
      admin: {
        nav: lightHsl.cardBackground,
        navHover: lightHsl.accent,
        navActive: lightHsl.primary,
        card: lightHsl.cardBackground,
        cardBorder: lightHsl.divider,
      },
    },

    // Dark theme configuration
    dark: {
      // Core colors
      background: darkHsl.background,
      foreground: darkHsl.textPrimary,
      card: darkHsl.cardBackground,
      cardForeground: darkHsl.textPrimary,
      popover: darkHsl.cardBackground,
      popoverForeground: darkHsl.textPrimary,

      // Primary branding
      primary: darkHsl.primary,
      primaryForeground: "0 0% 100%", // White text on wine red

      // Secondary colors
      secondary: darkHsl.cardBackground,
      secondaryForeground: darkHsl.textPrimary,

      // Muted colors
      muted: darkHsl.cardBackground,
      mutedForeground: darkHsl.textSecondary,

      // Accent colors
      accent: darkHsl.accent,
      accentForeground: darkHsl.textPrimary,

      // Interactive elements
      border: darkHsl.divider,
      input: darkHsl.divider,
      ring: darkHsl.primary,

      // Semantic colors
      destructive: darkHsl.error,
      destructiveForeground: "0 0% 100%",
      success: darkHsl.success,
      successForeground: "0 0% 100%",
      warning: darkHsl.warning,
      warningForeground: darkHsl.background,

      // Sidebar specific
      sidebar: {
        background: darkHsl.cardBackground,
        foreground: darkHsl.textPrimary,
        primary: darkHsl.primary,
        primaryForeground: "0 0% 100%",
        accent: darkHsl.cardBackground,
        accentForeground: darkHsl.textPrimary,
        border: darkHsl.divider,
        ring: darkHsl.primary,
      },

      // Admin panel specific
      admin: {
        nav: darkHsl.background,
        navHover: darkHsl.cardBackground,
        navActive: darkHsl.primary,
        card: darkHsl.cardBackground,
        cardBorder: darkHsl.divider,
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

  // Shadows (adjusted for new color scheme)
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
};

// Export brand colors for easy access
export const BRAND_COLOR_LIGHT = lightColors.primary; // #7B2D26
export const BRAND_COLOR_DARK = darkColors.primary; // #9E2A2B
export const ACCENT_COLOR_LIGHT = lightColors.accent; // #F7E8C9
export const ACCENT_COLOR_DARK = darkColors.accent; // #D4AF7F

// Current primary color (defaults to light mode)
export const BRAND_COLOR = BRAND_COLOR_LIGHT;

// Utility function to get theme colors for a specific mode
export function getThemeColors(mode: "light" | "dark") {
  return themeConfig.colors[mode];
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
    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,
    "--secondary": colors.secondary,
    "--secondary-foreground": colors.secondaryForeground,
    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,
    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,
    "--destructive": colors.destructive,
    "--destructive-foreground": colors.destructiveForeground,
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
