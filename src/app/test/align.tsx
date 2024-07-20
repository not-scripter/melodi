import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";

export default function align() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <View className="flex-1 items-center justify-start">
      <FlatList
        data={arr}
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="w-full bg-blue-300 flex-1 items-center justify-center h-20"
          >
            <Text>Test({item})</Text>
          </View>
        )}
        className="bg-red-300 w-20"
      />
    </View>
  );
}
