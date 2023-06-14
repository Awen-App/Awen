import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

const LoadingScreen = () => {
    const navigation = useNavigation();
    const rotateValue = new Animated.Value(0);

    useEffect(() => {
      const rotateAnimation = Animated.timing(rotateValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      });

      rotateAnimation.start(() => {
        
        // navigation.navigate('GetStart');
      });

      return () => {
        rotateAnimation.stop();
      };
    }, []);

    const spin = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  console.log(spin)
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/logo-awen-final1.png')}
          style={[styles.image, { transform: [{ rotate: spin }] }]}
        />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    image: {
      width: 300,
      height: 200,
    },
  });
  export default LoadingScreen