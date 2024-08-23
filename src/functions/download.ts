//

async function downloadImage(imageUrl, filename) {
  try {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  } catch (error) {
    console.log("something when wrong!");
  }
}
export default downloadImage;
