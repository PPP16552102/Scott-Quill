import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "",
  dataset: "production",
  apiVersion: "2025-10-25",
  useCdn: false,
});
