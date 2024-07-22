import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Appearance from "./appearance";
import Cache from "./cache";
import Database from "./database";
import Player from "./player";
import { TabBar } from "@/components/TabBar";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator tabBar={TabBar} initialRouteName="appearance">
      <Tab.Screen
        name="Appearance"
        component={Appearance}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="Cache"
        component={Cache}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="Database"
        component={Database}
        options={{ tabBarIcon: "cloud" }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{ tabBarIcon: "build" }}
      />
    </Tab.Navigator>
  );
}
