export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  BANNED = 'banned',
}

export enum UserRole {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  VIEW_ONLY = 'view_only',
}

export interface User {
  cognitoReferenceId: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  phoneCode?: string;
  email: string;
  company?: string;
  role: UserRole;
  status: UserStatus;
  [key: string]: any;
}

export enum CompanyStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  DELETED = 'deleted',
  PENDING_VERIFICATION = 'pending_verification',
}

export enum CompanyVerificationStatus {
  VERIFIED = 'verified',
  RETRY_ALLOWED = 'retry',
  REJECTED = 'rejected',
  NONE = 'none',
}

export enum SignUpStage {}

export enum CompanyTypes {
  SOLE_TRADER = 'sole_trader',
  COMPANY = 'company',
}

export interface Company {
  companyNumber: string;
  name: string;
  tradingName: string;
  tradingAddress: any;
  address: any;
  countryCode: string;
  createdBy: string;
  industry: string;
  type: CompanyTypes;
  directors: Array<string>;
  users: Array<string>;
  identifier: string;
  status: CompanyStatus;
  signUpStage: SignUpStage;
  verification: CompanyVerificationStatus;
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PENDING = 'pending',
  OVERDUE = 'overdue',
  PAID = 'paid',
}

export interface Invoice {
  _id: string;
  invoiceRefNumber: string;
  amount: string;
  customerName?: string;
  note?: string;
  status: InvoiceStatus;
  createdOn: Date;
  dueDate?: Date;
  attachmentUrl?: string;
  customerEmail?: string;
  customerEmailCC?: string;
  company: string;
  completedAt: Date;
  // paymentEntity?: string
}

export enum CompanyOfficerVerificationStatus {
  VERIFIED = 'verified',
  RETRY_ALLOWED = 'retry',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export interface CompanyOfficer {
  _id?: string;
  firstName: string;
  lastName: string;
  role: string;
  address?: string;
  occupation?: string;
  nationality?: string;
  countryOfResidence?: string;
  dateOfBirth: string;
  verificationStatus?: CompanyOfficerVerificationStatus;
  kycResponse?: object;
  company?: string;
}

export interface Integration {
  _id?: string;
  name: string;
  webhookUrl?: string;
  redirectUrl?: string;
  paymentPageColor?: string;
  paymentPageButtonColor?: string;
  logoUrl?: string;
  bankAccount: string;
  enabled: boolean;
  isLive: boolean;
  company: string;
}
export interface Provider {
  _id: string;
  externalId: string;
  name: string;
  logo: string;
  countryId: string;
  enabled: boolean;
}

export enum TransactionStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  REJECTED = 'rejected',
  REFUNDS = 'refunds',
}

export interface Transaction {
  _id: string;
  amount: string;
  paymentType?: string;
  status: TransactionStatus;
  createdOn: Date;
  completedOn?: Date;
  company: string;
  notes?: Array<string>;
}

export enum MerchantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISABLED = 'disabled',
}

export interface Merchant {
  _id: string;
  [key: string]: any;
}

export enum PaymentTypes {
  LINK = 'link',
  QR = 'qr',
}

export enum PaymentStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PENDING = 'pending',
  OVERDUE = 'overdue',
  PAID = 'paid',
}

export interface Payment {
  _id: string;
  type: PaymentTypes;
  link: string;
  uuid: string;
  qrCodeData?: string;
  invoiceRefNumber: string;
  amount: string;
  customerName?: string;
  note?: string;
  status: PaymentStatus;
  createdOn: Date;
  dueDate?: Date;
  completedAt?: Date;
  attachmentUrl?: string;
  customerEmail?: string;
  customerEmailCC?: string;
  company: string;
  createdBy: string;
  currency?: string;
  // paymentEntity?: string
}

export interface Terminal {
  _id: string;
  name: string;
  bankAccount: string;
  enabled: boolean;
  company: string;
}
