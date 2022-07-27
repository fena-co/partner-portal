import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyTypes } from '@fena/types';

export interface CompanyState {
  id?: string;
  name?: string;
  address?: any;
  industry?: string;
  tradingName?: string;
  tradingAddress?: any;
  type?: CompanyTypes;
  identifier?: string;
  selectedOfficerId?: string;
  countryCode?: string;
  bankAccounts?: Array<any>;
  directors?: Array<any>;
  verifiedByDirector?: any;
  publicEmail?: string;
  publicWebsite?: string;
  integrations?: Array<any>;
  supportPhone?: string;
  taxNumber?: string;
  termsOfService?: string;
  privacyPolicy?: string;
  legalFirstName?: string;
  legalLastName?: string;
  maxPaymentAmount: number;
  defaultIntegration?: string;
}

const initialState: CompanyState = {
  id: undefined,
  name: undefined,
  address: undefined,
  industry: undefined,
  tradingName: undefined,
  tradingAddress: undefined,
  type: undefined,
  identifier: undefined,
  selectedOfficerId: undefined,
  countryCode: undefined,
  bankAccounts: [],
  directors: [],
  verifiedByDirector: undefined,
  supportPhone: undefined,
  taxNumber: undefined,
  termsOfService: undefined,
  publicWebsite: undefined,
  integrations: [],
  publicEmail: undefined,
  privacyPolicy: undefined,
  legalFirstName: undefined,
  legalLastName: undefined,
  maxPaymentAmount: 1500,
  defaultIntegration: undefined,
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData: (state, data: PayloadAction<Partial<CompanyState>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      return { ...state, ...data.payload };
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const { setCompanyData, resetData } = companySlice.actions;
export default companySlice.reducer;
