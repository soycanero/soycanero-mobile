import * as functions from '@react-native-firebase/functions';

export interface SendOTPDto {
  email: string;
}

export interface SendOTPResponse {
  success: boolean;
}

export const sendOtpFunction = async (dto: SendOTPDto) => {
  try {
    const functionsInstance = functions.getFunctions();
    const response = await functions.httpsCallable<SendOTPDto, SendOTPResponse>(
      functionsInstance,
      'sendOtp',
    )(dto);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
