import storeModel from './../models';
import AsyncStorage from '@react-native-community/async-storage';

// Create instance of store model
const store = storeModel.create({
  memoStore: {
    loader: false,
    memoArray: [],
    overlayVisible: false,
    editId: 0,
  },
});
AsyncStorage.getItem('@MyText').then(data => {
  console.log(data);
  const memoStore_old = JSON.parse(data);
  memoStore_old.memoArray.forEach(element => {
    store.memoStore.loadItem(element);
  });
});

export default store;
