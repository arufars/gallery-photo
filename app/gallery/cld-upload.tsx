"use client";

import { CldUploadButton } from "next-cloudinary";
import { createImage } from "./_action";
import { Button } from "~/components/ui/button";

export default function UploadButton() {
  return (
    <Button asChild>
      <div className="flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mr-2 h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>

        <CldUploadButton
          onSuccess={async (results) => {
            //@ts-ignore
            await createImage(results.info.secure_url, results.info.public_id);
            //@ts-ignore
            console.log("Info: ", results.info);
          }}
          uploadPreset="bhikoj0a"
        />
      </div>
    </Button>
  );
}
// export default function UploadButton() {
//   return (
//     <CldUploadWidget signatureEndpoint="http://localhost:3000/api/sign-image">
//       {({ open }) => {
//         return (
//           <Button asChild onClick={() => open()}>
//             <div className="flex gap-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="size-6 mr-2 h-4 w-4"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
//                 />
//               </svg>
//             </div>
//           </Button>
//         );
//       }}
//     </CldUploadWidget>
//   );
// }
