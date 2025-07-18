import {
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
  ACCENT_COLOR_LIGHT,
  ACCENT_COLOR_DARK,
  lightColors,
  darkColors,
} from "@/config/theme";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeDemo() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const currentPrimary = isLight ? BRAND_COLOR_LIGHT : BRAND_COLOR_DARK;
  const currentAccent = isLight ? ACCENT_COLOR_LIGHT : ACCENT_COLOR_DARK;
  const currentColors = isLight ? lightColors : darkColors;

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="text-sm font-medium text-foreground mb-3">
        🎨 {isLight ? "Light" : "Dark"} Mode Palette
      </div>

      {/* Primary Colors */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Primary</span>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded border shadow-sm"
              style={{ backgroundColor: currentPrimary }}
            />
            <span className="font-mono text-xs text-foreground">
              {currentPrimary}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Accent</span>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded border shadow-sm"
              style={{ backgroundColor: currentAccent }}
            />
            <span className="font-mono text-xs text-foreground">
              {currentAccent}
            </span>
          </div>
        </div>
      </div>

      {/* Semantic Colors */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div
            className="w-6 h-6 rounded mx-auto mb-1 border shadow-sm"
            style={{ backgroundColor: currentColors.success }}
          />
          <span className="text-xs text-muted-foreground">Success</span>
        </div>
        <div className="text-center">
          <div
            className="w-6 h-6 rounded mx-auto mb-1 border shadow-sm"
            style={{ backgroundColor: currentColors.warning }}
          />
          <span className="text-xs text-muted-foreground">Warning</span>
        </div>
        <div className="text-center">
          <div
            className="w-6 h-6 rounded mx-auto mb-1 border shadow-sm"
            style={{ backgroundColor: currentColors.error }}
          />
          <span className="text-xs text-muted-foreground">Error</span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground border-t border-border pt-2">
        Manage colors in:{" "}
        <code className="bg-muted px-1 rounded text-foreground">
          client/config/theme.ts
        </code>
      </div>
    </div>
  );
}
