import { getImageCache } from "~/utils/query";
import CloudinaryImage from "./cld-image";
import UploadButton from "./cld-upload";
import ImageGrid from "~/components/image-grid";

export const revalidate = 1;

export default async function GalleryPage() {
  const results = await getImageCache();

  console.log(results[0]);

  // Konversi created_at menjadi objek Date jika perlu
  const processedResults = results.map((result) => ({
    ...result,
    created_at: new Date(result.created_at),
  }));

  processedResults.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

  return (
    <section className="pb-10">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold">Gallery Page</h1>
          <UploadButton />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {!results.length && <p>No images found</p>}
          <ImageGrid images={processedResults}/>

          {/* {processedResults?.map((result) => (
            <CloudinaryImage
              key={result.id}
              public_id={result.public_id}
              favorite={result.favorite}
              src={result.url}
              alt="Description of my image"
            />
          ))} */}
        </div>
      </div>
    </section>
  );
}
