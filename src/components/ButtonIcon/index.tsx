import theme from "../../theme";
import { Container } from "./styles";

import { Text, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  type: "add" | "remove";
};

export const ButtonIcon = ({ type, ...rest }: Props) => {
  return (
    <Container {...rest}>
      {type === "add" ? (
        <Text style={{ color: theme.COLORS.GREEN_700, fontSize: 24 }}>+</Text>
      ) : (
        <Text style={{ color: theme.COLORS.RED, fontSize: 24 }}>x</Text>
      )}
    </Container>
  );
};
