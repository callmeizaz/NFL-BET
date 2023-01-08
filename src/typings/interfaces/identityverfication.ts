export interface IdentityVerificationFormPayload {
  userId: number;
  identificationData: {
    address1: string;
    city: string;

    postalCode: string;
    phone: string;
    state: string | object;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    ssn: string;
  };
}
