import { View, Text, TouchableOpacityProps } from "react-native";
import React from "react";
import { ButtonTypeStyleProps, Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  type?: ButtonTypeStyleProps;
  title: string;
};

export const Button = ({ title, type = "PRIMARY", ...rest }: Props) => {
  return (
    <Container {...rest} type={type}>
      <Title>{title}</Title>
    </Container>
  );
};
