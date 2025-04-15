import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const beverages = [
  { id: '1', name: 'Diet Coke', description: '355ml, Price', price: '$1.99', image: require('../assets/diet_coke.png') },
  { id: '2', name: 'Sprite Can', description: '325ml, Price', price: '$1.50', image: require('../assets/sprite.png') },
  { id: '3', name: 'Apple & Grape Juice', description: '2L, Price', price: '$15.99', image: require('../assets/apple_grape_juice.png') },
  { id: '4', name: 'Orange Juice', description: '2L, Price', price: '$15.99', image: require('../assets/orange_juice.png') },
  { id: '5', name: 'Coca Cola Can', description: '325ml, Price', price: '$4.99', image: require('../assets/coca_cola.png') },
  { id: '6', name: 'Pepsi Can', description: '330ml, Price', price: '$4.99', image: require('../assets/pepsi.png') },
];

const BeveragesScreen = () => {
  const renderBeverage = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={beverages}
      renderItem={renderBeverage}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { justifyContent: 'space-between' },
  productCard: { backgroundColor: '#fff', padding: 8, borderRadius: 8, marginBottom: 8, width: '48%', marginRight: '4%' },
  productImage: { width: '100%', height: 100, borderRadius: 8 },
  productName: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  productDescription: { color: '#888', fontSize: 12 },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  productPrice: { fontSize: 16, fontWeight: 'bold' },
  addButton: { backgroundColor: 'green', borderRadius: 50, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16 },
});

export default BeveragesScreen;