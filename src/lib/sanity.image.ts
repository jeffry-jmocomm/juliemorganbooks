import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./sanity.client";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "your-project-id",
  dataset: dataset || "production",
});

export const urlFor = (source: any) => {
  return imageBuilder.image(source);
};
