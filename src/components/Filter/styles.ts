import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export type FilterStyleProps = TouchableOpacityProps & {
  isActive?: boolean;
};

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme.COLORS.GREEN_700 : "transparent"};

  border-radius: 4px;
  margin-right: 12px;

  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  color: white;

  text-transform: uppercase;
`;
