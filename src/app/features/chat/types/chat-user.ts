import { Timestamp } from '@react-native-firebase/firestore';

export interface ChatUserBase {
  id: string;
  email: string;
}

export interface ChatUserDoc extends ChatUserBase {
  createdAt: Timestamp;
}

export interface ChatUser extends ChatUserBase {
  createdAt: Date;
}
