import { globalStyles } from '@/constants/theme';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import FastImage, { ResizeMode, Source } from '@d11/react-native-fast-image';
import React from 'react';
import { Text } from 'react-native-paper';

export interface WelcomeItem {
  id: string;
  key: string;
  imageUrl: string;
  text: string;
}

interface WelcomeCarouselItemProps extends AnimatedProps<ViewProps> {
  imageSource?: Source;
  index?: number;
  rounded?: boolean;
  resizeMode?: ResizeMode;
  text?: string;
}

export default function WelcomeCarouselItem(props: WelcomeCarouselItemProps) {
  const {
    style,
    imageSource,
    rounded = false,
    resizeMode = 'cover',
    text,
    ...animatedViewProps
  } = props;

  return (
    <Animated.View style={[styles.container, style]} {...animatedViewProps}>
      <FastImage
        style={[styles.image, rounded && styles.imageRounded]}
        source={imageSource}
        resizeMode={resizeMode}
      />
      {text && (
        <View style={styles.textWrapper}>
          <Text variant="bodyMedium" style={styles.text}>
            {text}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  imageRounded: {
    borderRadius: globalStyles.spacing.m,
  },
  textWrapper: {
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: globalStyles.spacing.m,
  },
  text: {
    textAlign: 'center',
  },
});
