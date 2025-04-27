import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Thêm useFocusEffect

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  // Hàm tải dữ liệu từ AsyncStorage
  const loadCartItems = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]); // Đảm bảo danh sách rỗng nếu không có dữ liệu
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  // Tải lại dữ liệu mỗi khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      loadCartItems();
    }, [])
  );

  const updateCart = async (updatedItems) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateCart(updatedCart);
  };

  const updateQuantity = (itemId, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name.toUpperCase()}</Text>
        <Text style={styles.itemWeight}>{item.weight}, Price</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Text style={styles.quantityButton}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity || 1}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.itemPrice}>${(item.price * (item.quantity || 1)).toFixed(2)}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Ionicons name="close" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
      />
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>GO TO CHECKOUT</Text>
        <Text style={styles.checkoutPrice}>${totalPrice.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 16 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemWeight: { fontSize: 12, color: '#888', marginVertical: 4 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { fontSize: 20, paddingHorizontal: 10, color: '#28a745' },
  quantity: { fontSize: 16, marginHorizontal: 10 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', marginRight: 16 },
  removeButton: { padding: 8 },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  checkoutPrice: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});

export default CartScreen;