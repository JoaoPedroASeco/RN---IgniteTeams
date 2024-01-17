import { Alert, View } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Input } from "../../components/Input";
import { Container, Content, Icon } from "./styles";
import theme from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../utils/AppError";

export const NewGroup = () => {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma");
      }

      await groupCreate(group);
      navigation.navigate("Players", { group: group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Nao foi possivel criar um novo grupo.");
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <Header showbackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />
        <Input
          placeholder="Nome da turma"
          placeholderTextColor={theme.COLORS.GRAY_300}
          onChangeText={setGroup}
        />
        <View style={{ marginTop: 10, marginBottom: 10 }} />
        <Button title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  );
};
