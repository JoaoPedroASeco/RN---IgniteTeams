import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Groups } from "../screens/Groups/Groups";
import { NewGroup } from "../screens/NewGroup";
import { Players } from "../screens/Players";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator initialRouteName="Groups" screenOptions={{ headerShown: false }}>
      <Screen name="Groups" component={Groups} />
      <Screen name="NewGroup" component={NewGroup} />
      <Screen name="Players" component={Players} />
    </Navigator>
  );
};
