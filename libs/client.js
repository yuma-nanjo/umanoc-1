import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'umanoc',
  apiKey: process.env.API_KEY,
});