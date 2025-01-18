import { createRoot } from "react-dom/client";
import { Client } from "@gradio/client";
import "./style.css";

// Init content insertion
const div = document.createElement("div");
div.id = "__root";
document.body.appendChild(div);

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);

let selectionMode = false; // Tracks if selection mode is active

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
      style={{ backgroundColor: selectionMode ? "#00f" : "#ccc" }} // Dynamic color
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

document.addEventListener(
  "click",
  async (e: MouseEvent) => {
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
      const imageSrc = img.currentSrc;

      const profile = await fetch(
        "https://raw.githubusercontent.com/ccs-cs1l-f24/clothes/refs/heads/main/clothes-extension/public/profile.jpg"
      );

      // for no-cors workaround, we can download to disk first?
      // https://stackoverflow.com/questions/2153979/chrome-extension-how-to-save-a-file-on-disk
      const garment = await fetch(imageSrc);

      // Init gradio
      const app = await Client.connect("yisol/IDM-VTON");

      const result = await app.predict("/tryon", [
        { background: profile.blob(), layers: [], composite: null },
        garment.blob(), // blob in 'Garment' Image component
        "", // string  description of the garment
        true, // boolean  use auto mask
        true, // boolean  use auto resize and crop
        30, // number  in 'Denoising Steps' Number component
        42, // number  in 'Seed' Number component
      ]);

      console.log(result);
    } else {
      // Disable selection mode if clicking anything other than an image
      selectionMode = false;
      const button = document.getElementById("selection-button");
      if (button) {
        button.style.backgroundColor = "#ccc"; // Reset button color
      }
      console.log("Selection mode disabled.");
    }
  },
  true
); // Use the capturing phase to intercept all clicks
