import { WelcomeItem } from '@/features/auth/components/welcome-carousel-item';

export const welcomeData: WelcomeItem[] = [
  {
    key: '1',
    id: '1',
    imageUrl: 'https://dummyimage.com/1000x500/000/fff&text=Benefit1',
    text: 'Beneficio 1',
  },
  {
    key: '2',
    id: '2',
    imageUrl: 'https://dummyimage.com/1000x500/000/fff&text=Benefit2',
    text: 'Beneficio 2',
  },
  {
    key: '3',
    id: '3',
    imageUrl: 'https://dummyimage.com/1000x500/000/fff&text=Benefit3',
    text: 'Beneficio 3',
  },
];

export const lastWelcomeIndex = welcomeData.length - 1;
