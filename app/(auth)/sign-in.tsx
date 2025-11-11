import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const signIn = () => {
  return (
    <View>
      <Text>sign-in</Text>
      <Button title="Sign-upS" onPress={() => router.push("/sign-up")} />
    </View>
  );
};

export default signIn;
