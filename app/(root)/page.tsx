import IllustrationGrid from "@/components/illustration/IllustrationGrid";
import { getAllIllustrations } from "@/lib/actions/illustration.actions";

export default async function Home() {

  const illustrations = await getAllIllustrations()
  
  return (
    <main className="min-h-screen pt-10 flex justify-center items-center w-full">
      {illustrations && <IllustrationGrid illustrations={illustrations} />}
    </main>
  );
}
