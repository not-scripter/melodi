import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { PropsWithChildren } from "react";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

export type SideNavProps = {
  data: {
    icon: string;
    label: string;
    href: string;
  }[];
  props?: any;
};

export default function SideNav({
  data,
  props,
}: PropsWithChildren<SideNavProps>) {
  const theme = useAppTheme();
  return (
    <View className="w-20 pb-20">
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            className="h-24 flex items-center justify-center -rotate-90"
          >
            <Text
              className="font-bold tracking-wide"
              style={{ color: theme.colors.secondary }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        {...props}
      />
    </View>
  );
}
// <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
