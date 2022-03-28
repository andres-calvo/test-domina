export class Base64Service {
  toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = (event) => {
        typeof event.target.result == "string"
          ? resolve(event.target.result)
          : resolve(event.target.result.toString());
      };
      reader.readAsDataURL(file);
    });
  };
  toFile = (file: string) => {
    var arr = file.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "file", { type: mime });
  };
}
