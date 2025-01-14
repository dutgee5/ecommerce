import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/products.json";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products";
import { ActivityIndicator } from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); // id arrives as a string to be converted to a number

  // const product = products.find((product) => product.id === Number(id));

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(Number(id)),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Product not found</Text>;
  }

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: data.name }} />
      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{
            uri: data.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={"${product.name} image"}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {data.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${data.price}
          </Heading>
          <Text size="sm">{data.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
