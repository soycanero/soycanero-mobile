import { globalStyles } from '@/constants/theme';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import FastImage, { ResizeMode, Source } from '@d11/react-native-fast-image';
import React from 'react';

interface CarouselItemProps extends AnimatedProps<ViewProps> {
  imageSource?: Source;
  index?: number;
  rounded?: boolean;
  resizeMode?: ResizeMode;
}

export default function CarouselItem(props: CarouselItemProps) {
  const {
    style,
    imageSource,
    rounded = false,
    resizeMode = 'cover',
    ...animatedViewProps
  } = props;

  return (
    <Animated.View style={[styles.container, style]} {...animatedViewProps}>
      <FastImage
        style={[styles.image, rounded && styles.imageRounded]}
        source={imageSource}
        resizeMode={resizeMode}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageRounded: {
    borderRadius: globalStyles.spacing.m,
  },
});
