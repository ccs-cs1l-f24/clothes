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
      img.srcset = "";
      img.src =
        "https://raw.githubusercontent.com/ccs-cs1l-f24/clothes/refs/heads/main/clothes-extension/public/profile.jpg";
      return;

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
  },
  true
); // Use the capturing phase to intercept all clicks
