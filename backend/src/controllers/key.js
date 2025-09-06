// hashKey.js
import bcrypt from "bcryptjs";

async function hashPrivateKey() {
  try {
    const privateKey = "0x769356f97dddce7b3b161fabd0e6bf9b6fb67ddd048c1edbd29d73a34b61b00b"; // replace with your key
    const saltRounds = 10;

    const hashedKey = await bcrypt.hash(privateKey, saltRounds);
    console.log("Original Key:", privateKey);
    console.log("Hashed Key:", hashedKey);
  } catch (err) {
    console.error("Error hashing key:", err);
  }
}

hashPrivateKey();
