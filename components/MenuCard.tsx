import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MenuCard = ({
  item: { $id, image_ul, name, price },
}: {
  item: MenuItem;
}) => {
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity className="menu-card">
      <Image
        source={{ uri: image_ul }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />

      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>

      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>

      <TouchableOpacity
        onPress={() =>
          addItem({
            id: $id,
            name,
            price,
            image_url: image_ul,
            customizations: [],
          })
        }
      >
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
