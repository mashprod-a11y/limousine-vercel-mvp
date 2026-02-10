import {
  IconRing,
  IconParty,
  IconCake,
  IconTemple,
  IconMoon,
  IconSparkles,
  IconBuilding,
} from "@/components/Icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ring: IconRing,
  party: IconParty,
  cake: IconCake,
  temple: IconTemple,
  moon: IconMoon,
  sparkles: IconSparkles,
  building: IconBuilding,
};

export default function PrestationIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
