export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["product", id] as const,
};

export const orderKeys = {
  all: ["orders"] as const,
  myOrders: ["myOrders"] as const,
  detail: (id: string) => ["order", id] as const,
};

export const paypalKeys = {
  clientId: () => ["paypalClientId"] as const,
};
