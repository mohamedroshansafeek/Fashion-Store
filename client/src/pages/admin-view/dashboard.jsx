import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage } from "@/store/common-slice"; // getFeatureImages remove
import { useState } from "react";
import { useDispatch } from "react-redux";
import bannerTwo from "../../assets/banner-2.webp"; // only bannerTwo

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();

  // ONLY local bannerTwo
  const localBanners = [{ image: bannerTwo }];

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return;
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />

      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {localBanners.map((banner, index) => (
          <div key={index} className="relative w-full">
            <img
              src={banner.image}
              className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[600px] object-cover rounded-t-lg"
              alt={`banner-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

