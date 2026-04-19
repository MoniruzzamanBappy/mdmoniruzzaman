import { Card, CardContent } from "@/components/ui/card";

interface AchievementCardProps {
  icon: string;
  title: string;
  description?: string;
}

export default function AchievementCard({
  icon,
  title,
  description,
}: AchievementCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-teal-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(45,212,191,0.12)]">
      <div className="absolute inset-0 scale-0 rounded-full bg-teal-400/10 blur-3xl transition-transform duration-700 group-hover:scale-100" />

      <CardContent className="relative z-10 p-6">
        <div className="flex items-start gap-4">
          <div className="text-2xl">{icon}</div>

          <div>
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-teal-300">
              {title}
            </h3>

            {description && (
              <p className="mt-1 text-sm text-white/60">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
