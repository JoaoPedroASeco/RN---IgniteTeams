import { ButtonIcon } from "../ButtonIcon";
import { Container, Name } from "./styles";

type Props = {
  name: string;
  onRemove: () => void;
};

export const PlayerCard = ({ name, onRemove }: Props) => {
  return (
    <Container>
      <Name>{name}</Name>

      <ButtonIcon type="remove" onPress={onRemove} />
    </Container>
  );
};
