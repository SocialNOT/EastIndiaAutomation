import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import nextPlugin from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    }),
    nextPlugin({
      // Disables the Genkit dev UI.
      // Set to false if you want to use the UI.
      disableUI: true,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
