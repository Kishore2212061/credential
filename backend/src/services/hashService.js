import { createHash } from "crypto";
import fs from "fs";


export function sha256OfFile(filePath) {
const buf = fs.readFileSync(filePath);
return "0x" + createHash("sha256").update(buf).digest("hex");
}


export function fileBytes(filePath) {
return fs.readFileSync(filePath);
}