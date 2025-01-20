import { createRoot } from "react-dom/client";
import { Client } from "@gradio/client";
import "./style.css";

// Selection Button Root
const div = document.createElement("div");
div.id = "__root_select_button";
document.body.appendChild(div);

const rootContainer = document.querySelector("#__root_select_button");
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);

// Overlay Root
const overlayDiv = document.createElement("div");
overlayDiv.id = "__root_overlay";
document.body.appendChild(overlayDiv);

const overlayRootContainer = document.querySelector("#__root_overlay");
if (!overlayRootContainer) throw new Error("Can't find Content root element");
const overlayRoot = createRoot(overlayRootContainer);

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

overlayRoot.render(
  <div className={`overlay-frame`} id="overlay-frame">
    <img
      src="https://raw.githubusercontent.com/ccs-cs1l-f24/clothes/refs/heads/main/clothes-extension/public/loading.gif"
      alt="Profile"
      style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
    />
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
    const overlayFrame = document.getElementById("overlay-frame");
    if (overlayFrame) overlayFrame.style.display = "none";

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

      // Make the frame visible
      if (overlayFrame) {
        overlayFrame.style.display = "flex";
        console.log("Making visible");
      }

      return;
      const res = await fetch("http://localhost:3000/api/idm-vton", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log(await res.json());
    }
  },
  true
); // Use the capturing phase to intercept all clicks
