import { getImageCache } from "~/utils/query";
import UploadButton from "../gallery/cld-upload";
import CloudinaryImage from "../gallery/cld-image";

export default async function FavoritesPage() {
  const results = await getImageCache();

  console.log(results[0]);

  const favorites = results?.filter((result) => result.favorite);

  return (
    <section className="pb-10">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold">Gallery Page</h1>
          <UploadButton />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {favorites?.map((result) => (
            <CloudinaryImage
              key={result.id}
              public_id={result.public_id}
              favorite={result.favorite}
              src={result.url}
              alt="Description of my image"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
