import { e as error } from './index-64aa7a5e.js';
import { c as collections } from './database-541a19be.js';

async function downloadFile(sha256, convId) {
  const fileId = collections.bucket.find({ filename: `${convId.toString()}-${sha256}` });
  let mime = "";
  const content = await fileId.next().then(async (file) => {
    if (!file) {
      throw error(404, "File not found");
    }
    if (file.metadata?.conversation !== convId.toString()) {
      throw error(403, "You don't have access to this file.");
    }
    mime = file.metadata?.mime;
    const fileStream = collections.bucket.openDownloadStream(file._id);
    const fileBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      fileStream.on("data", (chunk) => chunks.push(chunk));
      fileStream.on("error", reject);
      fileStream.on("end", () => resolve(Buffer.concat(chunks)));
    });
    return fileBuffer;
  });
  return { content, mime };
}

export { downloadFile as d };
//# sourceMappingURL=downloadFile-841cb4f2.js.map
