interface OutletInput {
  name: string;
  address: string;
  cityId: string;
}

interface OutletUpdateInput {
  name?: string;
  address?: string;
  cityId?: string;
}

export { OutletInput, OutletUpdateInput };
