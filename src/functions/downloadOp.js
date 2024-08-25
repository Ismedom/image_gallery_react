export function downloadOp(downloadImage, item, size) {
  const sizeMap = {
    landscape: item.src.landscape,
    large2x: item.src.large2x,
    large: item.src.large,
    original: item.src.original,
    portrait: item.src.portrait,
    medium: item.src.medium,
    tiny: item.src.tiny,
    small: item.src.small,
  };

  const selectedSize = sizeMap[size] || item.src.small;
  const fileName = `download_${size || "small"}`;

  return downloadImage(selectedSize, fileName);
}
