import { WelcomeItem } from '@/features/auth/components/welcome-carousel-item';

export const welcomeData: WelcomeItem[] = [
  {
    key: '1',
    id: '1',
    imageUrl: 'https://dummyimage.com/1200x800/000/fff&text=Benefit1',
    text: 'Beneficio  de su perfil en soy canero #1',
  },
  {
    key: '2',
    id: '2',
    imageUrl: 'https://dummyimage.com/1200x800/000/fff&text=Benefit2',
    text: 'Beneficio  de su perfil en soy canero #2',
  },
  {
    key: '3',
    id: '3',
    imageUrl: 'https://dummyimage.com/1200x800/000/fff&text=Benefit3',
    text: 'Beneficio  de su perfil en soy canero #3',
  },
];

export const lastWelcomeIndex = welcomeData.length - 1;
