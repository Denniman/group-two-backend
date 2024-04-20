export interface StoreValidation {
  id: string;
  storeName: string;
  primaryColor: string;
  storeBannerImage: string;
  fontStyle: string;
  secondaryColor: string;
  storeDescription: string | null;
}

export type StoreModelInterface = StoreValidation;

export type StoreInterface = Pick<StoreValidation, "id" | "storeName" | "storeDescription">;
