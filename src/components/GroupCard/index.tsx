import { TouchableOpacityProps } from "react-native";
import React from "react";
import { Container, Title, Icon } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export const GroupCard = ({ title, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
};
