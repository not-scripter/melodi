import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Appearance from "./appearance";
import Cache from "./cache";
import Database from "./database";
import Player from "./player";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="appearance" component={Appearance} options={{}} />
      <Tab.Screen name="cache" component={Cache} />
      <Tab.Screen name="database" component={Database} />
      <Tab.Screen name="player" component={Player} />
    </Tab.Navigator>
  );
}
