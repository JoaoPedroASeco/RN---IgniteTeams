import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  align-items: center;
  justify-content: start;
  padding: 32px 24px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 32px;
`;
