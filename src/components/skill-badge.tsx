import { cn } from "@/lib/utils";

interface Props {
  name: string;
  className?: string;
}

const SkillBadge = ({ name, className }: Props) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm px-3 py-1 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
        className
      )}
    >
      {name}
    </div>
  );
};

export default SkillBadge;
