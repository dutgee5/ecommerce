import { ActivityIndicator, FlatList } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  // const { width } = useWindowDimensions();
  // const numColumns = width > 700 ? 3 : 2;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products</Text>;
  }
  const numColumns = useBreakpointValue({
    default: "2",
    sm: "3",
  });
  return (
    <FlatList
      key={numColumns}
      data={data}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    ></FlatList>
  );
}
