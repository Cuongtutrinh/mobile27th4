import React from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Fresh Fruits & Vegetable', image: require('../assets/fruits_vegetable.png') },
  { id: '2', name: 'Cooking Oil & Ghee', image: require('../assets/oil_ghee.png') },
  { id: '3', name: 'Meat & Fish', image: require('../assets/meat_fish.png') },
  { id: '4', name: 'Bakery & Snacks', image: require('../assets/bakery_snacks.png') },
  { id: '5', name: 'Dairy & Eggs', image: require('../assets/dairy_eggs.png') },
  { id: '6', name: 'Beverages', image: require('../assets/beverages.png') },
];

const ExploreScreen = ({ navigation }) => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => item.name === 'Beverages' && navigation.navigate('Beverages')}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search Store"
          placeholderTextColor="#888"
        />
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key="2-columns" // Thêm key để tránh lỗi numColumns
        columnWrapperStyle={styles.row}
      />
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
});

export default ExploreScreen;