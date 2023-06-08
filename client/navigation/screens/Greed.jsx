

import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
const images = [
  'https://pasundanekspres.co/wp-content/uploads/2019/05/DD.png',
  'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2016/05/Membeli-Sayuran-dengan-Aplikasi-Ilustrasi.jpg',
  'https://i1.wp.com/www.maxmanroe.com/vid/wp-content/uploads/2018/07/Pengertian-Pasar-Tradisional.jpg?resize=640%2C361&ssl=1',
];
// const images = [
//   require('./img_nature_wide.jpg'),
//   require('./img_snow_wide.jpg'),
//   require('./img_mountains_wide.jpg'),
// ];
export default Greed=()=>{
  const [data,setData]=useState(images)
  return (
    <View style={styles.container} >
        <SliderBox
            images={data}
            sliderBoxHeight={200}
            onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
            }
            parentWidth={this.state.width}
        />
    </View>
);
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})
// const Greed = () => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   const previousSlide = () => {
//     let newIndex = slideIndex - 1;
//     if (newIndex < 0) newIndex = images.length - 1;
//     setSlideIndex(newIndex);
//   };

//   const nextSlide = () => {
//     let newIndex = slideIndex + 1;
//     if (newIndex >= images.length) newIndex = 0;
//     setSlideIndex(newIndex);
//   };

//   const jumpToSlide = (index) => {
//     setSlideIndex(index);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.slideshowContainer}>
//         {images.map((image, index) => (
//           <View
//             key={index}
//             style={[
//               styles.mySlides,
//               { display: index === slideIndex ? 'flex' : 'none' },
//             ]}
//           >
//             <Text style={styles.numbertext}>{`${index + 1} / ${images.length}`}</Text>
//             <Image source={{uri:image}} style={styles.image} />
//             <Text style={styles.text}>Caption Text</Text>
//           </View>
//         ))}
//         <TouchableOpacity style={styles.prev} onPress={previousSlide}>
//           <Text style={styles.buttonText}>❮</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.next} onPress={nextSlide}>
//           <Text style={styles.buttonText}>❯</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.dotsContainer}>
//         {images.map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.dot,
//               index === slideIndex && styles.activeDot,
//             ]}
//             onPress={() => jumpToSlide(index)}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   slideshowContainer: {
//     position: 'relative',
//     marginVertical: 10,
//   },
//   mySlides: {
//     display: 'none',
//   },
//   numbertext: {
//     color: '#f2f2f2',
//     fontSize: 12,
//     padding: 8,
//     position: 'absolute',
//     top: 0,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//   },
//   text: {
//     color: '#f2f2f2',
//     fontSize: 15,
//     padding: 8,
//     position: 'absolute',
//     bottom: 8,
//     width: '100%',
//     textAlign: 'center',
//   },
//   prev: {
//     position: 'absolute',
//     top: '50%',
//     left: 0,
//     padding: 16,
//     marginTop: -22,
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//     borderRadius: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     transition: '0.6s',
//     userSelect: 'none',
//   },
//   next: {
//     position: 'absolute',
//     top: '50%',
//     right: 0,
//     padding: 16,
//     marginTop: -22,
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//     borderRadius: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     transition: '0.6s',
//     userSelect: 'none',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   dot: {
//     width: 15,
//     height: 15,
//     marginHorizontal: 2,
//     backgroundColor: '#bbb',
//     borderRadius: 50,
//     transition: 'background-color 0.6s',
//   },
//   activeDot: {
//     backgroundColor: '#717171',
//   },
// });

// export default Greed;




// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet } from 'react-native';


// const Greed = () => {
//   const [position, setPosition] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPosition(prevPosition =>
//         prevPosition === images.length - 1 ? 0 : prevPosition + 1
//       );
//     }, 2000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: images[position] }} style={styles.image} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.3,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 300,
//     height: 200,
//     borderRadius:5
//   },
// });

// export default Greed;
