import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 32px 0;
`;

export const Title = styled.Text`
  text-align: center;

  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Subtitle = styled.Text`
  text-align: center;

  font-size: 16px;
  font-weight: regular;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
