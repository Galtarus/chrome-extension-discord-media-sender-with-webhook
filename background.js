// This is the URL to your webhook. Replace this with your own.
const WEBHOOK_URL = "https://discord.com/api/webhooks/your_webhook_here";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToDiscord",
    title: "Send to Discord",
    contexts: ["selection", "image", "video","link"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "sendToDiscord") {
    let formData = new FormData();
    if (info.linkUrl) {
      console.log("Link found: " + info.linkUrl);
      formData.append("content", info.linkUrl);
      sendToDiscord(formData);
      return;  // If it's a link, we don't need to go any further
    }
    if (info.srcUrl) {
      let response = await fetch(info.srcUrl);
      let blob = await response.blob();
      let dataUrl = await blobToDataURL(blob);
      let splitUrl = dataUrl.split(",");
      let base64Data = splitUrl[1];
      let format = splitUrl[0].match(/(.*)\/(.*);base64/)[2];
      
      let fileBlob = base64ToBlob(base64Data, `${format}`);
      formData.append("file", fileBlob, `file.${format}`);
    } else if (info.selectionText) {
      formData.append("content", info.selectionText);
    } else {
      console.log("No media URL or highlighted text found.");
      return;
    }
    
    fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    }).catch(error => console.error('Error:', error));
  }
});

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(blob);
  });
}

function base64ToBlob(base64, mimeType) {
  var byteString = atob(base64);
  var arrayBuffer = new ArrayBuffer(byteString.length);
  var int8Array = new Uint8Array(arrayBuffer);
  for (var i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([int8Array], {type: mimeType});  
}

async function sendToDiscord(formData) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });
    console.log("Response: ", response);
  } catch (error) {
    console.error("Error:", error);
  }
}
