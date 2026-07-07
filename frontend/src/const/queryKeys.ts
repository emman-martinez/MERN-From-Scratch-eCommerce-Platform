export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["product", id] as const,
};
