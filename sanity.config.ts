import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jvnzq2ee";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "ark-studio",
  title: "ARK — Aesthetic Resin Kreations",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Series")
              .child(
                S.documentTypeList("productSeries")
                  .title("Series")
                  .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                item.getId() !== "siteSettings" && item.getId() !== "productSeries"
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
