interface ServiceInput {
  name: string;
  price: number;
  duration: number;
}

interface ServiceUpdateInput {
  name?: string;
  price?: number;
  duration?: number;
}

export { ServiceInput, ServiceUpdateInput };
