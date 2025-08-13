/**
 * Main entry point for Firebase Cloud Functions (TypeScript)
 * https://firebase.google.com/docs/functions
 */

// Set global options (e.g. cost control)
import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({ maxInstances: 10 });

// Example HTTPS onRequest function (delete or rename as needed)
import { onRequest } from "firebase-functions/v2/https";

export const helloWorld = onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Export additional functions here as needed, e.g.:
// export { menuSuggestion } from "./genkit-sample";
export { menuSuggestion } from "./genkit-sample";
