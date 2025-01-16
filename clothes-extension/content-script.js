/* TODO: Share data between website and extension

- We only need to have the person image stored
- We can clear all clothing images once we sync with the website

*/

window.postMessage({ type: "DATA_SHARE", data: "Hello from the extension" }, "*");
