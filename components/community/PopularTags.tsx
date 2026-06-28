import { Card } from "@/components/common/ui/Card";
import { popularTags } from "@/lib/mock";

type PopularTagsProps = {
  selectedTag: string;
  onTagClick: (tag: string) => void;
};

export function PopularTags({ selectedTag, onTagClick }: PopularTagsProps) {
  return (
    <Card variant="glass" padding="lg" radius="xl">
      <p className="text-xs font-black tracking-[0.18em] text-run-lime">POPULAR TAGS</p>
      <h2 className="mt-2 text-xl font-black text-run-text">인기 태그</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {popularTags.map((tag) => {
          const isActive = selectedTag === tag;

          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => onTagClick(tag)}
              className={[
                "rounded-full border px-3 py-2 text-xs font-black transition duration-200 hover:scale-[1.02]",
                isActive
                  ? "border-run-lime bg-run-lime text-run-bg"
                  : "border-run-border bg-run-bg text-run-muted hover:border-run-lime/50 hover:text-run-lime",
              ].join(" ")}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
