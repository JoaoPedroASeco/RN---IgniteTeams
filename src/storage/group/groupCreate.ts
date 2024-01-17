import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GROUP_COLLECTION,
  PLAYER_COLLECTION,
  groupsGetAll,
} from "../storageConfig";
import { AppError } from "../../utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("Ja existe um grupo cadastrada com esse nome.");
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...storedGroups, newGroup])
    );
  } catch (error) {
    throw error;
  }
}

export const groupRemoveByName = async (name: string) => {
  try {
    const storedGroups = await groupsGetAll();
    const groups = storedGroups.filter((group) => group !== name);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${name}`);
  } catch (error) {
    throw error;
  }
};
