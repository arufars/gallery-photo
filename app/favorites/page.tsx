import { getImageCache } from "~/utils/query";
import UploadButton from "../gallery/cld-upload";
import Refresh from "~/components/Refresh";
import ImageGrid from "~/components/image-grid";

export default async function FavoritesPage() {
  const results = await getImageCache();

  console.log(results[0]);

  const favorites = results?.filter((result) => result.favorite);

  // Konversi created_at dan updated_at menjadi objek Date jika perlu
  const processedResults = favorites.map((result) => ({
    ...result,
    created_at: new Date(result.created_at),
    updated_at: new Date(result.updated_at), // Pastikan updated_at juga dikonversi
  }));

  processedResults.sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());

  return (
    <section className="pb-10">
      <Refresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold">Favorites Page</h1>
          <UploadButton />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {!favorites.length ? (
            <p>No images found</p>
          ) : (
            <ImageGrid images={processedResults} COLUMNS={3} />
          )}
        </div>
      </div>
    </section>
  );
}
