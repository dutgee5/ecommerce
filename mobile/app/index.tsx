import { View, Text, FlatList } from "react-native";
import products from "../assets/products.json"; // dummy data
import ProductListItem from "../components/ProductListItem";


export default function HomeScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
    ></FlatList>
  );
}
