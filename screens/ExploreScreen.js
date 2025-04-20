// ExploreScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import products from '../data/data.js';

const categories = [
  { id: '1', name: 'Fresh Fruits & Vegetable', image: require('../assets/fruits_vegetable.png') },
  { id: '2', name: 'Cooking Oil & Ghee', image: require('../assets/oil_ghee.png') },
  { id: '3', name: 'Meat & Fish', image: require('../assets/meat_fish.png') },
  { id: '4', name: 'Bakery & Snacks', image: require('../assets/bakery_snacks.png') },
  { id: '5', name: 'Dairy & Eggs', image: require('../assets/dairy_eggs.png') },
  { id: '6', name: 'Beverages', image: require('../assets/beverages.png') },
];

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu từ khóa tìm kiếm
  const [selectedFilters, setSelectedFilters] = useState({ category: [], brand: [] }); // State để lưu bộ lọc
  const [showResults, setShowResults] = useState(false); // State để kiểm soát hiển thị kết quả tìm kiếm

  // Hàm hiển thị danh mục
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => item.name === 'Beverages' && navigation.navigate('Beverages')}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Hàm hiển thị sản phẩm
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDetails}>{item.weight}, Price</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    setShowResults(true);
  };

  // Logic lọc sản phẩm
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedFilters.category.length
      ? selectedFilters.category.includes(product.category)
      : true;

    const matchesBrand = selectedFilters.brand.length
      ? selectedFilters.brand.includes(product.brand)
      : true;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Hàm áp dụng bộ lọc
  const applyFilters = (filters) => {
    setSelectedFilters(filters);
    setShowResults(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search Store"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => navigation.navigate('FilterScreen', { applyFilters })}>
          <Ionicons name="filter" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {showResults ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          key="2-columns"
          columnWrapperStyle={styles.row}
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          key="2-columns"
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: { marginRight: 8 },
  searchBarInput: { flex: 1, fontSize: 16, color: '#000' },
  row: { justifyContent: 'space-between' },
  categoryCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, width: '48%', marginBottom: 16, alignItems: 'center' },
  categoryImage: { width: 100, height: 100, borderRadius: 8 },
  categoryName: { fontSize: 14, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  productCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, width: '48%', marginBottom: 16, alignItems: 'center', position: 'relative' },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productName: { fontSize: 14, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  productDetails: { fontSize: 12, color: '#888', marginTop: 4 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#000', marginTop: 4 },
  addButton: { backgroundColor: '#28a745', borderRadius: 50, padding: 8, position: 'absolute', bottom: 16, right: 16 },
});

export default ExploreScreen;