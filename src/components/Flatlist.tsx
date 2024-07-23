import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import React from "react";
import { FlatList as NativeFlatlist } from "react-native";

interface FlatlistProps {
  data: object[];
  renderItem: () => {};
  ItemSeparatorComponent: React.ReactNode;
  keyExtractor: () => {};
}

export default function Flatlist({
  data,
  renderItem,
  ItemSeparatorComponent,
  keyExtractor,
  ...props
}: FlatlistProps) {
  const { colors } = useAppTheme();

  return (
    <NativeFlatlist
      {...props}
      contentContainerStyle={{ paddingBottom: 80 }}
      style={{ backgroundColor: colors.background }}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={keyExtractor}
    />
  );
}
