import { TextInput } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TextInput)`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  color: white;

  border-radius: 6px;
  padding: 16px;

  font-size: 16px;
  font-weight: normal;
`;
