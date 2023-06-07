import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const images = [
  'https://pasundanekspres.co/wp-content/uploads/2019/05/DD.png',
  'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2016/05/Membeli-Sayuran-dengan-Aplikasi-Ilustrasi.jpg',
  'https://i1.wp.com/www.maxmanroe.com/vid/wp-content/uploads/2018/07/Pengertian-Pasar-Tradisional.jpg?resize=640%2C361&ssl=1',
];

const Greed = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition =>
        prevPosition === images.length - 1 ? 0 : prevPosition + 1
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: images[position] }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius:5
  },
});

export default Greed;
