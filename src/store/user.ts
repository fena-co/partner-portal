import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole, UserStatus } from '@fena/types';

export interface UserState extends Partial<User> {
  token?: string;
  firstName: string;
  lastName: string;
  cognitoReferenceId: string;
  company?: string;
  phoneNumber?: string;
  position?: string;
  id?: string;
  officerIdIfExists?: string;
  loggedIn?: boolean;
}

const initialState: UserState = {
  token: undefined,
  loggedIn: false,
  firstName: '',
  lastName: '',
  cognitoReferenceId: '',
  phoneNumber: undefined,
  id: undefined,
  email: '',
  role: UserRole.VIEW_ONLY,
  status: UserStatus.ACTIVE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, data: PayloadAction<Partial<UserState>>) => {
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

export const { setUserData, resetData } = userSlice.actions;
export default userSlice.reducer;
