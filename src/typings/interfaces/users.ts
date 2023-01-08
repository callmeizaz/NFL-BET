export interface UserInfo {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  _customerTokenUrl: string;
  yahooAccessToken: string;
  yahooRefreshToken: string;
  espns2: string;
  espnswid: string;
  accountConfirmedAt: string;
  dateOfBirth: string;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiresIn: string;
  socialId: string;
  profileImage: string;
  promo: string;
  signUpState: string;
  lastLoginState: string;
  createdAt: string;
  updatedAt: string;
  verificationFileUploaded?: boolean;
  verificationFileName?: string | null;
}
