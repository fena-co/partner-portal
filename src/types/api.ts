import {
  BankAccount,
  Company,
  Invoice,
  Provider,
  User,
  Transaction,
} from '@fena/types';

export type WithId<T> = T & { _id: string };

export type BankAccountApiType = WithId<BankAccount>;

export type CompanyApiType = WithId<Company>;

export type InvoiceAPIType = WithId<Invoice>;

export type ProviderApiType = WithId<Provider>;

export type UserApiType = WithId<User>;

export type TransactionApiType = WithId<Transaction>;

export enum MerchantStatus {
  ACTIVE = 'active',
  PENDING = 'pending_verification',
  INACTIVE = 'inactive',
  DISABLED = 'disabled',
}
