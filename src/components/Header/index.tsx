import { Container, Logo, Backicon, BackButton } from "./styles";

import LogoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showbackButton?: boolean;
};

export const Header = ({ showbackButton }: Props) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("Groups");
  };

  return (
    <Container>
      {showbackButton && (
        <BackButton onPress={handleGoBack}>
          <Backicon />
        </BackButton>
      )}

      <Logo source={LogoImg} />
    </Container>
  );
};
