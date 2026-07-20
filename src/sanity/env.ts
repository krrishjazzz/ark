export const apiVersion = "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jvnzq2ee";

export const useCdn = process.env.NODE_ENV === "production";

export function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) throw new Error(errorMessage);
  return value;
}
