import { JournalHero } from "../../app/components/journal-hero";
import { JournalArticles } from "../../app/components/journal-articles";

export default function JournalPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <JournalHero />
      <JournalArticles />
    </div>
  );
}
