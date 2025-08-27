import { Timestamp } from '@react-native-firebase/firestore';

interface UserBase {
  id: string;
  email: string;
}

export interface UserDoc extends UserBase {
  createdAt: Timestamp;
}

export interface User extends UserBase {
  createdAt: Date;
}
