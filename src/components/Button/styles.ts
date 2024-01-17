import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = TouchableOpacityProps & {
  type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ type, theme }) =>
    type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;

  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;
