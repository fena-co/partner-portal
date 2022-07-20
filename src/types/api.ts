import {
  BankAccount,
  Company,
  Integration,
  Invoice,
  Provider,
  Payment,
  User,
  CompanyOfficer,
  Transaction,
} from '@fena/types';

export type WithId<T> = T & { _id: string };

export type BankAccountApiType = WithId<BankAccount>;

export type CompanyApiType = WithId<Company>;

export type InvoiceAPIType = WithId<Invoice>;

export type ProviderApiType = WithId<Provider>;

export type UserApiType = WithId<User>;

export type TransactionApiType = WithId<Transaction>;
