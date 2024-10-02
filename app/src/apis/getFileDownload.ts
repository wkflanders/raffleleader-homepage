import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetFileDownload } from "wasp/server/api";
import { HttpError } from "wasp/server";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_IAM_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_S3_IAM_SECRET_KEY!,
  },
});

export const getFileDownload: GetFileDownload<{ key: string }, { url: string }> = async (req, res, context) => {
  const { key } = req.params;
  console.log(`Attempting to generate signed URL for key: ${key}`);

  if (!process.env.AWS_S3_FILES_BUCKET) {
    console.error('AWS_S3_FILES_BUCKET is not defined');
    throw new HttpError(500, 'Server configuration error');
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_FILES_BUCKET,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log(`Successfully generated signed URL for key: ${key}`);
    res.json({ url });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    if ((error as any).Code === 'NoSuchKey') {
      throw new HttpError(404, 'File not found');
    }
    throw new HttpError(500, 'Failed to generate signed URL');
  }
}