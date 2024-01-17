import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../../utils/AppError";
import { PLAYER_COLLECTION } from "../storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export const removePlayer = async (
  { name }: PlayerStorageDTO,
  group: string
) => {
  try {
    const storedPlayers = await getPlayerByGroup(group);

    const playerAlreadyExists = storedPlayers?.find(
      (player) => player.name === name
    );

    if (!playerAlreadyExists) {
      throw new AppError("Essa pessoa nao foi encontrada nesse grupo");
    }

    const newPlayerArray = storedPlayers.filter(
      (player) => player.name != name
    );

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify([...newPlayerArray])
    );

    return newPlayerArray;
  } catch (error) {
    throw error;
  }
};

export const getPlayerByGroup = async (group: string) => {
  try {
    const players = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

    const storedPlayers: PlayerStorageDTO[] = players
      ? JSON.parse(players)
      : [];

    return storedPlayers;
  } catch (error) {
    throw error;
  }
};

export const playerAddByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string
) => {
  try {
    const storedPlayers = await getPlayerByGroup(group);

    const playerAlreadyExists = storedPlayers?.find(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists) {
      throw new AppError("Essa pessoa ja esta adicionada em um time aqui");
    }

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify([...storedPlayers, newPlayer])
    );
  } catch (error) {
    throw error;
  }
};
