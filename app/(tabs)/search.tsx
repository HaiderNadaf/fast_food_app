import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";

// API + Hooks
import { getCategories, getMenu } from "@/lib/appwriter";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const { category, query } = useLocalSearchParams() as {
    query: string;
    category: string;
  };

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      {/* 🔹 HEADER SECTION ALWAYS VISIBLE */}
      <View className="px-4 pt-4 gap-5">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="small-bold uppercase text-primary">Search</Text>
            <Text className="paragraph-semibold text-dark-100">
              Find your favourite food
            </Text>
          </View>
          <CartButton />
        </View>

        {/* Search Input */}
        <SearchBar />

        {/* Category Filters */}
        <Filter categories={categories || []} />
      </View>

      {/* 🔹 FOOD LIST */}
      <FlatList
        data={data || []}
        numColumns={2}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : String(index)
        }
        renderItem={({ item, index }) => {
          const isRightCol = index % 2 !== 0;

          return (
            <View
              className={`flex-1 max-w-[48%] ${!isRightCol ? "mt-10" : "mt-0"}`}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        ListEmptyComponent={
          !loading ? (
            <Text className="text-center mt-10 text-dark-100">
              No results found.
            </Text>
          ) : null
        }
        contentContainerClassName="gap-7 px-4 pt-4"
        columnWrapperClassName="gap-7"
      />
    </SafeAreaView>
  );
};

export default Search;
