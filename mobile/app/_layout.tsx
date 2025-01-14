import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import "@/global.css";
import { useCart } from "@/store/cartStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { Pressable } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNumber = useCart((state) => state.items.length);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () =>
              cartItemsNumber > 0 && (
                <Link href={"/cart"} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNumber}</Text>
                  </Pressable>
                </Link>
              ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
