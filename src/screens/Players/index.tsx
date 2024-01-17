import React, { useCallback, useMemo, useRef, useState } from "react";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styled";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Input } from "../../components/Input";
import { Filter } from "../../components/Filter";
import { Alert, FlatList } from "react-native";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  getPlayerByGroup,
  playerAddByGroup,
  removePlayer,
} from "../../storage/player/playerAddByGroup";
import { AppError } from "../../utils/AppError";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "../../storage/group/groupCreate";

export const Players = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("TIME A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const inputRef: any = useRef(null);

  const route: any = useRoute();
  const { group } = route.params;

  const navigation = useNavigation();

  const handleAddPlayer = async () => {
    try {
      if (name.trim().length === 0) {
        return Alert.alert("Nova pessoa", "Informe o nome da pessoa.");
      }

      await playerAddByGroup({ name, team }, group);

      const storedPlayers = await getPlayerByGroup(group);

      inputRef?.current?.blur();

      setPlayers([...storedPlayers]);
      setName("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert(
          "Nova pessoa",
          "Nao foi possivel adicionar uma nova pessoa."
        );
        console.log(error);
      }
      console.log(error);
    }
  };

  const handleFetchPlayers = async () => {
    try {
      const storedPlayers = await getPlayerByGroup(group);

      setPlayers([...storedPlayers]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePlayer = async (player: PlayerStorageDTO) => {
    try {
      const newPlayers = await removePlayer(player, group);

      setPlayers(newPlayers);
    } catch (error) {
      console.log(error);
    }
  };

  const removeGroup = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate("Groups");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroupRemove = async () => {
    try {
      Alert.alert("Remover Grupo", `Deseja remover o grupo ${group}?`, [
        { text: `Nao`, style: `cancel` },
        { text: `Sim`, onPress: () => removeGroup() },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchPlayers();
    }, [])
  );

  const playersByTeam = useMemo(() => {
    return players.filter((player) => player.team === team);
  }, [team, players]);

  return (
    <Container>
      <Header showbackButton />

      <Highlight title={group} subtitle="Adicione a galera e separa os times" />
      <Form>
        <Input
          inputRef={inputRef}
          placeholder="Nome da empresa"
          autoCorrect={false}
          onChangeText={setName}
          value={name}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon type="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["TIME A", "TIME B"]}
          renderItem={({ item }) => (
            <Filter
              isActive={item === team}
              title={item}
              onPress={() => setTeam(item)}
            />
          )}
          keyExtractor={(item) => item}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={playersByTeam}
        renderItem={({ item: { name, team } }) => (
          <PlayerCard
            name={name}
            onRemove={() => handleRemovePlayer({ name, team })}
          />
        )}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={() => (
          <ListEmpty message="Nao ha pessoas nesse time" />
        )}
        contentContainerStyle={[
          {
            paddingBottom: 100,
          },
          playersByTeam.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
};
