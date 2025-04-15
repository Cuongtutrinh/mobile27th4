import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.productName}>{product.name}</Text>
          <TouchableOpacity>
            <Text>❤️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
        <Text style={styles.sectionTitle}>Product Detail</Text>
        <Text style={styles.detailText}>
          Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.
        </Text>
        <Text style={styles.sectionTitle}>Nutritions</Text>
        <Text style={styles.sectionTitle}>Review</Text>
        <Text style={styles.review}>★★★★★</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  productImage: { width: '100%', height: 200 },
  details: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productName: { fontSize: 20, fontWeight: 'bold' },
  productDescription: { color: '#888', fontSize: 14, marginVertical: 8 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  quantityButton: { fontSize: 24, paddingHorizontal: 16 },
  quantity: { fontSize: 18, paddingHorizontal: 16 },
  productPrice: { fontSize: 18, fontWeight: 'bold', marginLeft: 'auto' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  detailText: { color: '#888', fontSize: 14 },
  review: { color: 'orange', fontSize: 16 },
  addButton: { backgroundColor: 'green', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProductDetailScreen;