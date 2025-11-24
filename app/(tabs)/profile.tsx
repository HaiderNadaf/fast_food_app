import { images } from "@/constants";
import { Mail, MapPin, Phone, User } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView>
      <View className="flex-row items-center mt-16 ml-10">
        <Text className="text-xl font-semibold px-32">Profile</Text>
        <Image source={images.search} className="w-5 h-5 ml-8" />
      </View>

      <View className="flex justify-center items-center mt-10">
        <Image source={images.avatar} className="w-24 h-24" />
      </View>

      <View className="w-[300px] h-[370px] ml-12 mt-7 bg-white rounded-lg">
        {/* Full Name */}
        <View className="flex-row items-center p-4">
          <User color="#fb923c" size={28} className="mr-3" />
          <View className="ml-5">
            <Text className="text-gray-600">Full Name</Text>
            <Text className="text-lg font-semibold">Haider Nadaf</Text>
          </View>
        </View>

        {/* Email */}
        <View className="flex-row items-center p-4">
          <Mail color="#fb923c" size={28} className="mr-3" />
          <View className="ml-5">
            <Text className="text-gray-600">Email</Text>
            <Text className="text-lg font-semibold">
              haidernadaf67@gmail.com
            </Text>
          </View>
        </View>

        {/* Phone Number */}
        <View className="flex-row items-center p-4">
          <Phone color="#fb923c" size={28} className="mr-3" />
          <View className="ml-5">
            <Text className="text-gray-600">Phone Number</Text>
            <Text className="text-lg font-semibold">+91 9900768505</Text>
          </View>
        </View>

        {/* Address 1 */}
        <View className="flex-row items-center p-4">
          <MapPin color="#fb923c" size={28} className="mr-3" />
          <View className="ml-5">
            <Text className="text-gray-600">Address 1</Text>
            <Text className="text-lg font-semibold">
              Neela Apartment, EG-99
            </Text>
          </View>
        </View>

        {/* Address 2 */}
        <View className="flex-row items-center p-4">
          <MapPin color="#fb923c" size={28} className="mr-3" />
          <View className="ml-5">
            <Text className="text-gray-600">Address 2</Text>
            <Text className="text-lg font-semibold">Gold Coin Resort</Text>
          </View>
        </View>
      </View>

      <View className="px-12 mt-3 flex-row justify-center">
        <View className="w-full px-24 h-10 flex justify-center items-center rounded-2xl border border-orange-400 bg-orange-50">
          <Text className="text-orange-500 font-semibold">Edit Profile</Text>
        </View>
      </View>

      <View className="px-12 mt-5 flex-row justify-center">
        <View className="w-full px-24 h-10 flex justify-center items-center rounded-2xl border border-orange-400 bg-red-50">
          <Text className="text-red-500 font-semibold">Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
