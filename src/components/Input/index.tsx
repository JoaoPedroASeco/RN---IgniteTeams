import { Container } from "./styles";
import { TextInput, TextInputProps } from "react-native";
import theme from "../../theme";
import { RefObject } from "react";

type Props = TextInputProps & {
  inputRef?: RefObject<TextInput>;
};

export const Input = ({
  placeholderTextColor = theme.COLORS.GRAY_300,
  inputRef,
  ...rest
}: Props) => {
  return (
    <Container
      {...rest}
      ref={inputRef}
      placeholderTextColor={placeholderTextColor}
    />
  );
};
