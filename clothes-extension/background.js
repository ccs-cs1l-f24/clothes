chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveImage",
    title: "Save Image to LocalStorage",
    contexts: ["image"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveImage" && info.srcUrl) {
    fetch(info.srcUrl)
      .then((response) => response.blob()) // Fetch the image as a blob
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result; // Base64 encoded image data

          chrome.storage.local.get({ savedImages: [] }, (data) => {
            const updatedImages = [...data.savedImages, base64data];
            chrome.storage.local.set({ savedImages: updatedImages }, () => {
              console.log("Image saved to localStorage as base64:", base64data);
            });
          });
        };
        reader.readAsDataURL(blob); // Convert the blob to base64
      })
      .catch((error) => {
        console.error("Failed to fetch and save the image:", error);
      });
  }
});
