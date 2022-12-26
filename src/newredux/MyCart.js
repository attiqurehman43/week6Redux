import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatList, State} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToMyCart,
  deleteMyCartItem,
  removeMyCartItem,
} from './MyCartSlice';
import {decreaseQty, increaseQty} from './MyProductSlice';

const MyCart = () => {
  const myCartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1}}>
      <View style={styles.hdrstl}>
        <Text style={styles.hdrtxstl}>Redux ToolKit</Text>
      </View>
      <FlatList
        data={myCartItems}
        renderItem={({item, index}) => {
          return (
            <View style={styles.imgstl}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{flex: 1, width: 120, height: 100, borderRadius: 10}}
              />

              <View style={{marginLeft: 15, padding: 10, flex: 2}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  {item.name.substring(0, 20) + '...'}
                </Text>
                <Text style={{fontWeight: '600'}}>{item.brand}</Text>
                <Text style={{color: 'green', fontWeight: '600', fontSize: 16}}>
                  {'₨' + item.price}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  {item.qty == 0 ? null : (
                    <TouchableOpacity
                      style={styles.btnstyl}
                      onPress={() => {
                        if (item.qty > 1) {
                          dispatch(removeMyCartItem(item));
                          dispatch(decreaseQty(item.id));
                        } else {
                          dispatch(deleteMyCartItem(item.id));
                          dispatch(decreaseQty(item.id));
                        }
                      }}>
                      <Text style={{color: '#fff'}}>-</Text>
                    </TouchableOpacity>
                  )}

                  {item.qty == 0 ? null : (
                    <Text
                      style={{marginLeft: 10, fontSize: 16, fontWeight: '600'}}>
                      {item.qty}
                    </Text>
                  )}

                  {item.qty == 0 ? null : (
                    <TouchableOpacity
                      style={styles.btnstyl}
                      onPress={() => {
                        dispatch(addProductToMyCart(item));
                        dispatch(increaseQty(item.id));
                      }}>
                      <Text style={{color: '#fff'}}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hdrstl: {
    widht: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: 'red',
    elevation: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  hdrtxstl: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  imgstl: {
    width: '94%',
    height: 120,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  btnstyl: {
    backgroundColor: 'green',
    borderRadius: 7,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  crtbtnstl: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
