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
        name="appearance"
        component={Appearance}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="cache"
        component={Cache}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="database"
        component={Database}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="player"
        component={Player}
        options={{ tabBarIcon: "home" }}
      />
    </Tab.Navigator>
  );
}
