import { cn } from "@/util/cn";

export default function CustomHeading({
  className,
  normal,
  highlight,
}: {
  className?: string;
  normal: string;
  highlight: string;
}) {
  return (
    <h1 className={cn("inline lg:text-2xl md:text-xl text-lg", className)}>
      <span className="text-site-darkgreen inline">{normal}</span>&nbsp;
      <span className="text-site-yellow inline">{highlight}</span>
    </h1>
  );
}
