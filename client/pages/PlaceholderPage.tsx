import { LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
}

export default function PlaceholderPage({
  title,
  description,
  icon: Icon,
  features = [],
}: PlaceholderPageProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>

      {/* Content */}
      <div className="bg-admin-card border border-admin-card-border rounded-xl p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="p-6 bg-primary/10 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Icon className="h-12 w-12 text-primary" />
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            Coming Soon
          </h2>

          <p className="text-gray-400 mb-6">
            This section is currently under development. Check back soon for
            updates.
          </p>

          {features.length > 0 && (
            <div className="text-left">
              <h3 className="text-lg font-medium text-foreground mb-3">
                Planned Features:
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="mt-8 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}
