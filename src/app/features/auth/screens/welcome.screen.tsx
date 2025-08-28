/* eslint-disable react-native/no-inline-styles */
import { Text, Button } from 'react-native-paper';
import { useThemeStore } from '@/state/theme-store';
import { StyleSheet, View } from 'react-native';
import Layout from '@/features/shared/layout';
import React from 'react';
import { lastWelcomeIndex, welcomeData } from '@/constants/welcome';
import Carousel, {
  CarouselHandle,
} from '@/features/shared/components/carousel';
import { screenHeight, screenWidth } from '@/constants/app';
import WelcomeCarouselItem from '../components/welcome-carousel-item';
import { globalStyles } from '@/constants/theme';

export default function WelcomeScreen({ navigation }: any) {
  const setBarStyle = useThemeStore(state => state.setBarStyle);
  const carouselRef = React.useRef<CarouselHandle>(null);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const handlePressContinue = () => {
    if (!carouselRef.current) return;

    const isLast = currentIndex === lastWelcomeIndex;

    if (!isLast) {
      carouselRef.current.goToIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handlePressSkip = () => {
    if (carouselRef.current) {
      carouselRef.current.goToIndex(lastWelcomeIndex);
    }
    navigation.navigate('Login');
  };

  React.useLayoutEffect(() => {
    setBarStyle('dark-content');
  });

  return (
    <Layout
      mode="view"
      withBottom
      containerStyle={{ justifyContent: 'flex-end' }}
    >
      <View style={styles.titleContainer}>
        <Text variant="titleLarge" style={styles.titleText}>
          Bienvenido a Soy Cañero
        </Text>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          carouselRef={carouselRef}
          data={welcomeData}
          loop={false}
          autoPlay={false}
          width={screenWidth}
          height={screenWidth * 0.7}
          onSnapToItem={setCurrentIndex} // <- sincroniza aquí el estado externo
          renderItem={item => (
            <WelcomeCarouselItem
              imageSource={{ uri: item.item.imageUrl }}
              resizeMode="contain"
              text={item.item.text}
            />
          )}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={handlePressContinue}
          mode="contained"
          style={styles.button}
        >
          <Text variant="titleMedium">
            {currentIndex === welcomeData.length - 1 ? 'Empezar' : 'Siguiente'}
          </Text>
        </Button>
        <Button onPress={handlePressSkip} mode="text">
          <Text variant="titleMedium">Saltar</Text>
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layoutContainer: { justifyContent: 'flex-end' },
  titleContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
  carouselContainer: {
    height: screenHeight * 0.5,
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: globalStyles.spacing.l,
  },
  button: {
    width: screenWidth * 0.75,
  },
});
