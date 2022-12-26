import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AppNavigator from '../AppNavigator';
import {addMyProducts} from '../newredux/MyProductSlice';

let items = [
  {
    id: 0,
    image:
      'https://rukminim1.flixcart.com/image/832/832/k44hksw0/shoe/c/w/k/372602-9-puma-white-black-dark-shadow-high-risk-red-palace-blue-original-imafn2ramzfvrrnh.jpeg?q=70',
    name: 'XRay Jr Dark Shad Lace-Up Casual Shoes',
    brand: 'PUMA',
    price: 2500,
    qty: 0,
  },
  {
    id: 1,
    image:
      'https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/q/s/h/-original-imaggcawtmxbuhzf.jpeg?q=70',
    name: 'Sneakers For Men (Navy)',
    brand: 'RED TAPE',
    price: 3500,
    qty: 0,
  },
  {
    id: 3,
    image:
      'https://rukminim1.flixcart.com/image/832/832/shoe/k/q/b/navy-pipcs00005-provogue-7-original-imaemztf9zavrvwn.jpeg?q=70',
    name: 'Sneakers For Men (Navy)',
    brand: 'PROVOGUE',
    price: 1500,
    qty: 0,
  },
];
const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    items.map(item => {
      dispatch(addMyProducts(item));
    });
  }, []);
  return <AppNavigator />;
};

export default Main;
