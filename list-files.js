import fs from "fs";
import path from "path";

function listFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      listFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = listFiles(process.cwd());
console.log("📂 Project files:");
allFiles.forEach((file) => console.log(file));
