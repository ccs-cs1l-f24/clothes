import { createRoot } from "react-dom/client";
import { Client } from "@gradio/client";
import "./style.css";

// Init content insertion
const tryButtonRoot = document.createElement("div");
tryButtonRoot.id = "__root";
document.body.appendChild(tryButtonRoot);
const imageOverlayRoot = document.createElement("div");
imageOverlayRoot.id = "__image_root";
document.body.appendChild(imageOverlayRoot);

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Content root element");
const overalayRootContainer = document.querySelector("#__image_root");
if (!overalayRootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
const overlayRoot = createRoot(overalayRootContainer);

// State variables
let selectionMode = false;
let viewImageOverlay = false;

// Add hover indicator
const addHoverEffect = (img: HTMLImageElement) => {
  img.style.outline = "2px dashed #00f"; // Add dashed border
  img.style.cursor = "pointer"; // Change cursor to pointer
};

// Remove hover indicator
const removeHoverEffect = (img: HTMLImageElement) => {
  img.style.outline = ""; // Remove border
  img.style.cursor = ""; // Reset cursor
};

// Initialize button rendering
root.render(
  <div className="extension-frame">
    <button
      id="selection-button"
      onClick={() => {
        selectionMode = !selectionMode;
        const button = document.getElementById("selection-button");
        if (button) {
          button.style.backgroundColor = selectionMode ? "#00f" : "#ccc";
        }
        console.log(
          `Selection mode ${selectionMode ? "enabled" : "disabled"}.`
        );
      }}
    >
      TRY
    </button>
  </div>
);

// overlayRoot.render(
//   <div className={`overlay-frame ${viewImageOverlay ? "block" : "hidden"}`}>
//     <img
//       src="https://raw.githubusercontent.com/ccs-cs1l-f24/clothes/refs/heads/main/clothes-extension/public/profile.jpg"
//       alt="Profile"
//       style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
//     />
//   </div>
// );

// Attach event listeners to handle selection mode
document.addEventListener("mouseover", (e: MouseEvent) => {
  if (!selectionMode) return;

  e.stopImmediatePropagation();

  const target = e.target as HTMLElement | null;
  if (target && target.tagName === "IMG") {
    addHoverEffect(target as HTMLImageElement);
  }
});

document.addEventListener("mouseout", (e: MouseEvent) => {
  if (!selectionMode) return;

  e.stopImmediatePropagation();

  const target = e.target as HTMLElement | null;
  if (target && target.tagName === "IMG") {
    removeHoverEffect(target as HTMLImageElement);
  }
});

document.addEventListener("click", async (e: MouseEvent) => {
  if (!selectionMode) return;

  const target = e.target as HTMLElement | null;

  // Prevent default and stop propagation for all events
  e.preventDefault();
  e.stopImmediatePropagation();

  if (target && target.tagName === "IMG") {
    selectionMode = false; // Exit selection mode
    const button = document.getElementById("selection-button");
    if (button) {
      button.style.backgroundColor = "#ccc"; // Reset button color
    }

    console.log("Image selected!");

    const img = target as HTMLImageElement;

    // Construct payload
    const imageSrc = img.currentSrc;
    const humanSrc =
      "https://raw.githubusercontent.com/ccs-cs1l-f24/clothes/refs/heads/main/clothes-extension/public/profile.jpg";
    const garment_des = document.title;

    const payload = {
      garm_img: imageSrc,
      human_img: humanSrc,
    };

    const res = await fetch("http://localhost:3000/api/idm-vton", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    console.log(await res.json());
  } else {
    // Disable selection mode if clicking anything other than an image
    selectionMode = false;
    const button = document.getElementById("selection-button");
    if (button) {
      button.style.backgroundColor = "#ccc"; // Reset button color
    }
    console.log("Selection mode disabled.");
  }
}); // Use the capturing phase to intercept all clicks
