import { useState, useEffect, useRef } from "react";
import { Product } from "../../../utils/Types/product";
import { useGlobalContext } from "../../../provider/GlobalContextProvider";
import { farmsData } from "./FarmsData";

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const useMarketData = () => {
  const { location } = useGlobalContext(); 
  const farmData = useRef(farmsData).current; 
  const rayon = 20; 

  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [originalData, setOriginalData] = useState<Product[]>([]);

  useEffect(() => {
    let filteredFarms = farmData; 
    
    if (location && location.latitude && location.longitude) {
      filteredFarms = farmData.filter(farm => {
        const distance = calculateDistance(location.latitude, location.longitude, farm.location.latitude, farm.location.longitude);
        return distance <= rayon;
      });
    }

    const groupedProducts = new Map<string, Product>();
    filteredFarms.forEach(farm => {
        farm.products.forEach(product => {
          const existingProduct = groupedProducts.get(product.title.toLowerCase());
          if (existingProduct) {
            existingProduct.total += product.total;
            existingProduct.inventory += product.inventory;
          } else {
            groupedProducts.set(product.title.toLowerCase(), {
              ...product,
              farmId: farm.id,
            });
          }
        });
      });

    const filteredProducts = Array.from(groupedProducts.values());
    setOriginalData(filteredProducts)
    setFilteredData(originalData);
    setLoading(false);
    
  }, [location, farmsData]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(originalData);
    } else {
      const searchedProducts = originalData.filter(product =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(searchedProducts);
    }
  }

  return { 
    searchText, 
    filteredData, 
    handleSearch, 
    loading 
  };
};

export default useMarketData;
