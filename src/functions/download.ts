//

async function downloadImage(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      throw new Error("The URL does not point to an image!");
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = sanitizeFilename(filename);
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("An error occurred while downloading the image:", error);
    throw error;
  }
}

function sanitizeFilename(filename) {
  return filename.replace(/[^a-z0-9.]/gi, "_");
}

export default downloadImage;
