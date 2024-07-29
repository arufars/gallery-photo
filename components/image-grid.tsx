import React from "react";
import CloudinaryImage from "~/app/gallery/cld-image";

export default function ImageGrid({ images, COLUMNS  }: { images: any[], COLUMNS?: number }) {
  const MAX_COLUMNS = COLUMNS || 4;
  function getColumns(colIndex: number) {
    return images.filter((_, index) => index % MAX_COLUMNS === colIndex);
  }
  return (
    <>
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map((column, index) => (
        <div key={index} className="flex flex-col gap-4">
          {column.map((result) => (
            <CloudinaryImage
              key={result.id}
              public_id={result.public_id}
              favorite={result.favorite}
              src={result.url}
              alt="Description of my image"
            />
          ))}
        </div>
      ))}
    </>
  );
}
