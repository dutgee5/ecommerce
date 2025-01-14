import { HStack } from "@/components/ui/hstack";
import { useCart } from "@/store/cartStore";
import { FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const onCheckOut = async () => {
    // send items to the server
    resetCart();
  };

  if(items.length === 0) {
    return <Redirect href={"/"} />;
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full mx-auto p-2"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>${item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckOut}>
          <ButtonText>Check out</ButtonText>
        </Button>
      )}
    />
  );
}
