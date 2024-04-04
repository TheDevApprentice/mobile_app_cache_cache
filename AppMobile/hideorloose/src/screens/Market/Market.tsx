import React, { memo, useRef, useState } from "react";
import { View, FlatList } from "react-native";
import { Layout, TopNav, TextInput, useTheme, themeColor } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import useMarketData from "./Data/MarketDataHandler"; // Hook personnalisé
import { MainStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCartContext } from "../../provider/CartDataContext";
import ModalComponent from "./component/Modal";
import { SkeletonItem } from "./component/Skeleton";
import { marketStyles } from "./Styles/MarketStyle";
import { Product, ProductInCart } from "../../types/product";
import MarketProduct from "./component/MarketItem";
import TopNavigationBar from "./component/TopNavigation";

type Props = NativeStackScreenProps<MainStackParamList, "MainTabs">;

const HomeScreen: React.FC<Props> = memo(({ navigation }) => {
  const { searchText, filteredData, handleSearch, loading } = useMarketData(); // Hook personnalisé
  const styles = useRef(marketStyles).current;
  const [numColumns, setNumColumns] = useState<number>(2);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { handleAddProductToCart } = useCartContext();
  const [total, setTotal] = useState(0); 

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleConfirmQuantity = () => {
    if (selectedProduct) {
      const productInCart: ProductInCart = {
        ...selectedProduct,
        quantity: selectedQuantity,
        total: selectedQuantity * selectedProduct.unit_price,
      };
      handleAddProductToCart(productInCart);
      setModalVisible(false);
      setSelectedQuantity(0); 
      
    }
  };

  return (
    <Layout>
      <TopNavigationBar 
        searchText={searchText} 
        handleSearch={handleSearch} 
      />
      <View style={styles.container}>
        {loading ? (
          <FlatList
            key={numColumns}
            contentContainerStyle={styles.propertyListContainer}
            data={[1, 2, 3, 4]} // Données factices
            numColumns={numColumns}
            renderItem={() => <SkeletonItem />}
            keyExtractor={(item) => item.toString()}
          />
        ) : (
          <FlatList
            key={numColumns}
            contentContainerStyle={styles.propertyListContainer}
            data={filteredData}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <MarketProduct
                product={item}
                onPress={() => handleProductPress(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedProduct={selectedProduct}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
        handleConfirmQuantity={handleConfirmQuantity}
        total={total}
        setTotal={setTotal}
      />
    </Layout>
  );
});

export default memo(HomeScreen);
