import React from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dữ liệu cho "Exclusive Offer"
const exclusiveOffers = [
  { id: '1', name: 'Organic Bananas', description: '7pcs, Priceg', price: '$4.99', image: require('../assets/banana.png') },
  { id: '2', name: 'Red Apple', description: '1kg, Priceg', price: '$4.99', image: require('../assets/red_apple.png') },
];

// Dữ liệu cho "Best Selling"
const bestSelling = [
  { id: '3', name: 'Beef Bone', description: '1kg, Priceg', price: '$4.99', image: require('../assets/red_bell_peppers.png') },
  { id: '4', name: 'Broiler Chicken', description: '1kg, Priceg', price: '$4.99', image: require('../assets/green_leafy_vegetables.png') },
];

// Kết hợp cả hai danh sách để hiển thị trong FlatList
const allProducts = [...exclusiveOffers, ...bestSelling];

const HomeScreen = ({ navigation }) => {
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Vector.png')} style={styles.vector} />
        <Text style={styles.location}>Dhaka, Banassre</Text>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search Store"
            placeholderTextColor="#888"
          />
        </View>
      </View>
      <FlatList
        data={allProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key="2-columns"
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <Image source={require('../assets/banner.png')} style={styles.banner} />
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Exclusive Offer</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Best Selling</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { alignItems: 'center', marginBottom: 16 },
  location: { fontSize: 16, fontWeight: 'bold' },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: { marginRight: 8 },
  searchBarInput: { flex: 1, fontSize: 16, color: '#000' },
  banner: { width: '100%', height: 150, borderRadius: 8, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: 'green' },
  row: { justifyContent: 'space-between' },
  productCard: { 
    backgroundColor: '#fff', 
    padding: 8, 
    borderRadius: 8, 
    marginBottom: 8, 
    width: '48%',
    marginRight: '4%',
  },
  productImage: { 
    width: '100%', 
    height: 80,
    borderRadius: 8,
  },
  productName: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  productDescription: { color: '#888', fontSize: 12 },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  productPrice: { fontSize: 16, fontWeight: 'bold' },
  addButton: { backgroundColor: 'green', borderRadius: 50, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16 },
  vector: { paddingTop: -10, marginTop: 5 },
});

export default HomeScreen;