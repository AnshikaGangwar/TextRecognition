import React from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const Gallery = ({ captures = [] }) => (
  <ScrollView horizontal={true} style={[styles.bottomToolbar, styles.galleryContainer]}>
    {captures.map(({ uri }) => (
      <View style={styles.galleryImageContainer} key={uri}>
        <Image source={{ uri }} style={styles.galleryImage} />
      </View>
    ))}
  </ScrollView>
);

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  galleryContainer: {
    bottom: 120,
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
  },
  galleryImage: {
    width: 75,
    height: 75,
  },
});

export default Gallery;
