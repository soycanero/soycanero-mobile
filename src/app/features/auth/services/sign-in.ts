import { getAuth, signInWithCustomToken } from '@react-native-firebase/auth';

export interface SignInDto {
  token: string;
}

export const signIn = async (dto: SignInDto) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithCustomToken(auth, dto.token);
    return userCredential
  } catch (error) {
    console.error(error);
    throw error;
  }
};
