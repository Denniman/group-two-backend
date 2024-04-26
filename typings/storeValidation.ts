export interface StoreValidation {
  id: string;
  storeName: string;
  backgroundColor: string;
  storeBannerImage: string;
  fontStyle: string;
  color: string;
  storeDescription: string | null;
}

export type StoreModelInterface = StoreValidation;

export type StoreResponseInterface = Partial<StoreValidation>;

export type StoreInterface = Pick<StoreValidation, "id" | "storeName" | "storeDescription">;
