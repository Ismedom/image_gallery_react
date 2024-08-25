export const getSrc = (item, size) => {
  const sizeMap = {
    landscape: item.src.landscape,
    large2x: item.src.large2x,
    large: item.src.large,
    original: item.src.original,
    portrait: item.src.portrait,
    medium: item.src.medium,
    tiny: item.src.tiny,
  };

  return sizeMap[size] || item.src.small;
};
