export interface BusinessValidationInterface {
  id: string;
  businessName: string;
  businessLogo: string;
  phoneNumber: string;
  businessEmail: string;
  businessDescription: string;
}

export type BusinessModelInterface = BusinessValidationInterface;

export type BusinessInterface = Pick<BusinessValidationInterface, "id">;
