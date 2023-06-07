import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Navbar = () => {
  const [activeIcon, setActiveIcon] = useState('');

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('home')}
      >
        <Feather
          name="home"
          size={24}
          color={activeIcon === 'home' ? 'orange' : 'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('message-circle')}
      >
        <Feather
          name="message-circle"
          size={24}
          color={activeIcon === 'message-circle' ? 'orange' : 'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('menu')}
      >
        <Feather
          name="menu"
          size={24}
          color={activeIcon === 'menu' ? 'orange' : 'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('settings')}
      >
        <Feather
          name="settings"
          size={24}
          color={activeIcon === 'settings' ? 'orange' : 'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('help-circle')}
      >
        <Feather
          name="help-circle"
          size={24}
          color={activeIcon === 'help-circle' ? 'orange' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#33A09A',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
});

export default Navbar;
