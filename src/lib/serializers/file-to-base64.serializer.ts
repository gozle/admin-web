export const fileToBase64Serializer = (file: File) =>
  new Promise<string | ArrayBuffer | null>((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = (error) => rej(error);
  });
