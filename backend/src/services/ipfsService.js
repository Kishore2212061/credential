import axios from "axios";

const PINATA_JWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYmE5NjFlMC1jMDgxLTRkMzctYjcwYy03NzM3OTRhYzljZmQiLCJlbWFpbCI6Im1lcnNhbGtpc2hvcmU3OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzJhM2FkMDcxYjM5NzRlYTljZjIiLCJzY29wZWRLZXlTZWNyZXQiOiI2ZTBkZDMxNzJkZDEzYzhjZTFiYzZmNzJlMTIxOGFjNDkwNTg1NTE1ODllYWM0NTZhY2Q3ZGFmMDE5NGZiNGRmIiwiZXhwIjoxNzg3NjUwMTU4fQ.EnWrkomhG3JnvojNIJZvmOSyCiesMUfw3QlGfA1Rfds";

export async function uploadBytesToIPFS(bytes, filename = "file.pdf") {
  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    const formData = new FormData();
    formData.append("file", new Blob([bytes]), filename);

    const res = await axios.post(url, formData, {
      maxBodyLength: Infinity,
      headers: {
        Authorization: PINATA_JWT,
      },
    });

    return res.data.IpfsHash;
  } catch (err) {
    console.error("❌ Pinata upload failed:", err.response?.data || err.message);
    throw err;
  }
}
