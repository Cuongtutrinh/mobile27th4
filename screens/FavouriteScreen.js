import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Thêm useFocusEffect

const FavouriteScreen = () => {
  const [favourites, setFavourites] = useState([]);

  // Hàm tải dữ liệu từ AsyncStorage
  const loadFavourites = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      } else {
        setFavourites([]); // Đảm bảo danh sách rỗng nếu không có dữ liệu
      }
    } catch (error) {
      console.error('Error loading favourites:', error);
    }
  };

  // Tải lại dữ liệu mỗi khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      loadFavourites();
    }, [])
  );

  const updateFavourites = async (updatedFavourites) => {
    try {
      await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  };

  const removeFromFavourites = (itemId) => {
    const updatedFavourites = favourites.filter(item => item.id !== itemId);
    updateFavourites(updatedFavourites);
  };

  const addAllToCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let currentCart = storedCart ? JSON.parse(storedCart) : [];

      // Thêm các sản phẩm từ danh sách yêu thích vào giỏ hàng, tránh trùng lặp
      const newItems = favourites.filter(fav => !currentCart.some(cartItem => cartItem.id === fav.id));
      const updatedCart = [
        ...currentCart,
        ...newItems.map(item => ({ ...item, quantity: 1 })), // Thêm quantity: 1 cho các sản phẩm mới
      ];

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('All items added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const renderFavouriteItem = ({ item }) => (
    <View style={styles.favouriteItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemWeight}>{item.weight}, Price</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromFavourites(item.id)}>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        renderItem={renderFavouriteItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No favourite items</Text>}
      />
      {favourites.length > 0 && (
        <TouchableOpacity style={styles.addAllButton} onPress={addAllToCart}>
          <Text style={styles.addAllText}>ADD ALL TO CART</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  favouriteItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 16 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemWeight: { fontSize: 12, color: '#888', marginVertical: 4 },
  itemPrice: { fontSize: 16, fontWeight: 'bold' },
  removeButton: { padding: 8 },
  addAllButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addAllText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});

export default FavouriteScreen;