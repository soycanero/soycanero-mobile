import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import CarouselComponent, {
  ICarouselInstance,
  Pagination,
  TCarouselProps,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

import { PanGesture } from 'react-native-gesture-handler';
import { greyColor, primaryColor } from '@/constants/theme';

export interface CarouselHandle {
  getCurrentIndex: () => number;
  goToIndex: (index: number, animated?: boolean) => void;
}

interface CarouselProps<T> {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pagination?: boolean;
  loop: boolean;
  width: number;
  height: number;
  data: TCarouselProps<T>['data'];
  rounded?: boolean;
  carouselRef?: React.Ref<CarouselHandle>; // <- nueva prop
  containerStyle?: StyleProp<ViewStyle>;

  // onProgressChange?: (offsetProgress: number, absoluteProgress: number) => void;
  onSnapToItem?: (index: number) => void;
  renderItem: TCarouselProps<T>['renderItem'];
}

export default function Carousel<T>(props: CarouselProps<T>) {
  const {
    autoPlay = true,
    autoPlayInterval = 3000,
    pagination = true,
    containerStyle,
    loop,
    width,
    height,
    data,
    onSnapToItem,
    renderItem,
    carouselRef,
  } = props;
  const ref = React.useRef<ICarouselInstance | null>(null);
  const progress = useSharedValue<number>(0);
  const currentIndexRef = React.useRef<number>(0); // <- nueva referencia

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  React.useImperativeHandle(
    carouselRef,
    () => ({
      getCurrentIndex: () => currentIndexRef.current,
      goToIndex: (index: number, animated = true) => {
        ref.current?.scrollTo({
          count: index - currentIndexRef.current,
          animated,
        });
      },
    }),
    [],
  );

  const handleProgressChange = (
    offsetProgress: number,
    absoluteProgress: number,
  ) => {
    const rounded = Math.round(absoluteProgress);
    progress.set(absoluteProgress);

    if (onSnapToItem) {
      onSnapToItem(rounded);
    }
  };

  const handleSnapToItem = (index: number) => {
    currentIndexRef.current = index; // <- actualiza aquí, no en onProgressChange
    onSnapToItem?.(index);
  };

  return (
    <View id="carousel">
      <CarouselComponent
        ref={ref}
        data={data}
        onProgressChange={handleProgressChange}
        width={width}
        height={height}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        loop={loop}
        style={containerStyle}
        pagingEnabled={true}
        snapEnabled={true}
        onSnapToItem={handleSnapToItem}
        renderItem={renderItem}
        onConfigurePanGesture={(panGesture: PanGesture) => {
          panGesture.activeOffsetX([-10, 10]);
        }}
      />
      {pagination && (
        <View style={styles.paginationContainer}>
          <Pagination.Basic
            progress={progress}
            data={data as any[]}
            dotStyle={styles.paginationDotStyle}
            activeDotStyle={styles.paginationActiveDotStyle}
            containerStyle={styles.paginationContainerStyle}
            horizontal
            onPress={onPressPagination}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container

  // Item
  itemTouchableContainer: {
    flex: 1,
  },
  // Pagination
  paginationContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: greyColor,
  },
  paginationActiveDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: primaryColor,
  },
  paginationContainerStyle: {
    gap: 8,
    margin: 2,
  },
});
