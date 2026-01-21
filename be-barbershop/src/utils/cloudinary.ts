import { v2 as cloudinary } from "cloudinary";
import { AppErrors } from "../errors/AppError";

interface CloudinaryUploadResut {
  secure_url: string;
  public_id: string;
}

export const uploadImageToCloudinary = async (
  file: Express.Multer.File,
): Promise<CloudinaryUploadResut> => {
  if (!file) throw new AppErrors(404, "File not found!");

  return new Promise<CloudinaryUploadResut>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "image",
        },
        (err, result) => {
          if (err)
            return reject(
              new AppErrors(500, "Failed upload image to cloudinary"),
            );

          if (!result)
            return reject(
              new AppErrors(500, "Cloudinary upload returned no result!"),
            );

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      )
      .end(file.buffer);
  });
};

export const deleteImageFromCloudinary = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error: any) {
    throw new AppErrors(500, `Cloudinary delete failed: ${error.message}`);
  }
};
