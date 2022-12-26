import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  addProductToMyCart,
  deleteMyCartItem,
  removeMyCartItem,
} from '../newredux/MyCartSlice';
import {decreaseQty, increaseQty} from '../newredux/MyProductSlice';

const MyProducts = () => {
  const myProducts = useSelector(state => state.product);
  const myCartItems = useSelector(state => state.cart);

  console.log('added products in cart', myCartItems);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getTotal = () => {
    let total = 0;
    myCartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <View style={styles.hdrstl}>
        <Text style={styles.hdrtxstl}>Redux ToolKit</Text>
      </View>
      <FlatList
        data={myProducts}
        renderItem={({item, index}) => {
          return (
            <View style={styles.imgstl}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{flex: 1, width: 120, height: 100, borderRadius: 10}}
              />

              <View style={{marginLeft: 40, padding: 10, flex: 2}}>
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
                  {item.qty == 0 ? (
                    <TouchableOpacity
                      style={styles.btnstyl}
                      onPress={() => {
                        dispatch(addProductToMyCart(item));
                        dispatch(increaseQty(item.id));
                      }}>
                      <Text style={{color: '#fff'}}>Add to Cart</Text>
                    </TouchableOpacity>
                  ) : null}

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
      {myCartItems.length > 0 ? (
        <View style={styles.crtbtnstl}>
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
              {'added items' + '(' + myCartItems.length + ')'}
            </Text>
            <Text>{'Total:' + getTotal()}</Text>
          </View>
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <TouchableOpacity
              style={{
                width: '70%',
                height: 50,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}
              onPress={() => {
                navigation.navigate('MyCart');
              }}>
              <Text style={{color: '#fff'}}> View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default MyProducts;

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
