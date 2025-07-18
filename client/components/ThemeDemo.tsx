import { BRAND_COLOR, themeConfig } from "@/config/theme";

export function ThemeDemo() {
  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50">
      <div className="text-sm text-muted-foreground mb-2">
        Current Theme Color:
      </div>
      <div className="flex items-center space-x-3">
        <div
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: BRAND_COLOR }}
        />
        <div>
          <div className="font-mono text-xs text-foreground">{BRAND_COLOR}</div>
          <div className="font-mono text-xs text-muted-foreground">
            HSL: {themeConfig.colors.primary.hsl}
          </div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Change in:{" "}
        <code className="bg-muted px-1 rounded">client/config/theme.ts</code>
      </div>
    </div>
  );
}
