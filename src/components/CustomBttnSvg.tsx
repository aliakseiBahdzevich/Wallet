import React, { Children } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';


interface CustomBttnSvg {
  onPress?: () => void
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  disabled?: boolean
}

const CustomBttnSvg: React.FC<CustomBttnSvg> = ({
  onPress,
  style,
  children,
  disabled
}) => {

  const scale = useSharedValue(1); // Изменение масштаба
  // const opacity = useSharedValue(0); // Изменение прозрачности

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 200 });
    // opacity.value = withTiming(0.9, {duration: 100})
  }
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
    // opacity.value = withTiming(1, {duration: 100})
  }


  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    // opacity: opacity.value
  }));

 

  return (
  <>
    <TouchableWithoutFeedback 
      onPressIn={() => {handlePressIn(); onPress?.()}}
      onPressOut={() => handlePressOut()}
      disabled={disabled}
    >
      <Animated.View style={[style, animatedStyles]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  </>
  );
}


export default CustomBttnSvg;