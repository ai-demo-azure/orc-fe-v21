// image-utils.ts

export class ImageUtils {
  static isDataUri(value: string): boolean {
    return value.startsWith('data:image/');
  }

  static isHttpUrl(value: string): boolean {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  static dataUriToFile(dataUri: string, filename: string): File {
    const arr = dataUri.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  static checkImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true); // valid image
      img.onerror = () => resolve(false); // not an image or unreachable
      img.src = url;
    });
  }
}
