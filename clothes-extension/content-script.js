// Function to fetch the rules from the local JSON file
async function fetchRules() {
  try {
    const response = await fetch(
      chrome.runtime.getURL("config/image_select_rules.json")
    ); // Resolve the local file path
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const rules = await response.json();
    return rules;
  } catch (error) {
    console.error("Error loading image select rules:", error);
    return null; // Return null if the fetch fails
  }
}

// Function to get selectors for the current domain
async function getSelectorsForDomain() {
  const rules = await fetchRules(); // Fetch rules dynamically
  if (!rules) return []; // If rules couldn't load, return an empty array

  const domain = window.location.hostname; // Get current domain
  const selectors = rules[domain]?.selectors || rules.default?.selectors || [];
  if (selectors.length === 0) {
    console.warn(`No selectors found for domain: ${domain}.`);
  }
  return selectors;
}

async function addButtonsToClothingImages() {
  const selectors = await getSelectorsForDomain(); // Get selectors for the domain
  if (!selectors || selectors.length === 0) return; // Exit if no selectors are found

  console.log(selectors);

  // Loop through each selector
  selectors.forEach((selector) => {
    const images = document.querySelectorAll(selector); // Get all images matching the selector

    images.forEach((image) => {
      if (image.closest(".try-on-container")) return; // Skip if button already added

      // Create shadow root
      const container = document.createElement("div");
      container.className = "try-on-container";

      const shadow = container.attachShadow({ mode: "open" });

      // Add button HTML
      shadow.innerHTML = `
        <link rel="stylesheet" href="styles.css">
        <button class="try-on-button">Try On Me</button>
      `;

      // Position container relative to the image
      container.style.position = "relative";
      container.style.display = "inline-block";

      // Wrap the image with the container
      const parent = image.parentNode;
      parent.replaceChild(container, image);
      container.appendChild(image);
    });
  });
}

// Observe the DOM for dynamically added content
const observer = new MutationObserver(() => addButtonsToClothingImages());
observer.observe(document.body, { childList: true, subtree: true });

// Initial run to add buttons to existing images
// addButtonsToClothingImages();
