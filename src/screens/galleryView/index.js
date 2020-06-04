import React from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import ImagePicker from 'react-native-image-picker';
import RNTextDetector from 'react-native-text-detector';
import AsyncStorage from '@react-native-community/async-storage';

class Gallery extends React.Component {
  state = {
    photo: null,
    uri: null,
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
        this.setState({ uri: response.uri });
      }
    });
  };

  handleText = async () => {
    const { memoStore } = this.props.store;
    try {
      memoStore.loaderTrue();
      console.log('try', memoStore.loader);
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const visionResp = await RNTextDetector.detectFromUri(this.state.uri);
      console.log('visionResp');

      this.props.store.memoStore.addItem(visionResp);
      const key = '@MyText';
      // console.log('visionResp', visionResp);
      try {
        AsyncStorage.clear();
        await AsyncStorage.setItem(key, JSON.stringify(this.props.store.memoStore));
        Alert.alert('saved', 'Saved Successfully');
      } catch (error) {
        Alert.alert('Error', error + 'Error while saving');
      }
    } catch (e) {
      console.warn(e);
    }
    memoStore.loaderFalse();
    console.log('try outside', memoStore.loader);
  };
  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#c0c0c0' }}>
        {photo && <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />}
        <View style={styles.btnChoosePhoto}>
          <Button title="Choose Photo" onPress={this.handleChoosePhoto} color="#800040" />
        </View>
        <View style={styles.btnGetText}>
          <Button title="GET TEXT" onPress={this.handleText} size={32} color="#800040" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  btnChoosePhoto: {
    padding: 10,
  },
  btnGetText: {
    padding: 10,
    marginTop: 20,
  },
});
export default inject('store')(observer(Gallery));
