type ValidImages = "image/png" | "image/jpeg" | "Unknown filetype";
export async function imageValidation(file: File): Promise<ValidImages> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(evt.target.result as ArrayBufferLike);
        let bytes = [];
        uint.forEach((byte) => {
          bytes.push(byte.toString(16));
        });
        const hex = bytes.join("").toUpperCase();
        const binaryFileType = getMimetype(hex);
        resolve(binaryFileType);
      }
    };
    const blob = file.slice(0, 4);
    reader.readAsArrayBuffer(blob);
  });
}
const getMimetype = (signature): ValidImages => {
  switch (signature) {
    case "89504E47":
      return "image/png";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
    case "FFD8FFE2":
      return "image/jpeg";
    default:
      return "Unknown filetype";
  }
};
