import * as functions from '@react-native-firebase/functions';

export interface VerifyOTPDto {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  token: string;
}

export const verifyOtpFunction = async (dto: VerifyOTPDto) => {
  try {
    const functionsInstance = functions.getFunctions();
    const response = await functions.httpsCallable<
      VerifyOTPDto,
      VerifyOTPResponse
    >(
      functionsInstance,
      'verifyOtp',
    )(dto);
    console.log({ response });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
