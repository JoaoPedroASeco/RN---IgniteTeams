import { useCallback, useEffect, useState } from "react";
import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Container, Title } from "./styles";
import { FlatList, Text } from "react-native";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupsGetAll } from "../../storage/storageConfig";
import { Loading } from "../../components/Loading";

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate("NewGroup");
  };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const storedGroups = await groupsGetAll();
      setGroups(storedGroups);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate("Players", { group });
  };

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect");
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma " />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          }
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          style={{
            width: "100%",
            flex: 1,
          }}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
