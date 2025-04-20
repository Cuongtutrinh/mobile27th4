// FilterScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterScreen = ({ navigation, route }) => {
  const { applyFilters } = route.params;
  const [filters, setFilters] = useState({ category: [], brand: [] });

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const index = newFilters[type].indexOf(value);
      if (index === -1) {
        newFilters[type].push(value);
      } else {
        newFilters[type].splice(index, 1);
      }
      return newFilters;
    });
  };

  const handleApply = () => {
    applyFilters(filters);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filters</Text>

      <Text style={styles.sectionTitle}>Category</Text>
      <TouchableOpacity onPress={() => toggleFilter('category', 'Eggs')}>
        <Text style={filters.category.includes('Eggs') ? styles.selected : styles.option}>Eggs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFilter('category', 'Noodles & Pasta')}>
        <Text style={filters.category.includes('Noodles & Pasta') ? styles.selected : styles.option}>Noodles & Pasta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFilter('category', 'Chips & Crisps')}>
        <Text style={filters.category.includes('Chips & Crisps') ? styles.selected : styles.option}>Chips & Crisps</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFilter('category', 'Fast Food')}>
        <Text style={filters.category.includes('Fast Food') ? styles.selected : styles.option}>Fast Food</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Brand</Text>
      <TouchableOpacity onPress={() => toggleFilter('brand', 'Individual Collection')}>
        <Text style={filters.brand.includes('Individual Collection') ? styles.selected : styles.option}>Individual Collection</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFilter('brand', 'Cocola')}>
        <Text style={filters.brand.includes('Cocola') ? styles.selected : styles.option}>Cocola</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFilter('brand', 'Ifad')}>
        <Text style={filters.brand.includes('Ifad') ? styles.selected : styles.option}>Ifad</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFilter('brand', 'Kazi Farmas')}>
        <Text style={filters.brand.includes('Kazi Farmas') ? styles.selected : styles.option}>Kazi Farmas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  option: { fontSize: 14, paddingVertical: 8 },
  selected: { fontSize: 14, paddingVertical: 8, color: 'green', fontWeight: 'bold' },
  applyButton: { backgroundColor: '#28a745', padding: 16, borderRadius: 8, marginTop: 16 },
  applyButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default FilterScreen;