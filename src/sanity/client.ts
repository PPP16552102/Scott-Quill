import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bbrf8b1b",
  dataset: "production",
  apiVersion: "2025-10-25",
  useCdn: false,
});
