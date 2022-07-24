import React from "react";
import {
  Container,
  LeftContainer,
  Title,
  SubTitle,
  ButtonBox,
  Button,
  RightContainer,
  Image,
} from "./styles";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <LeftContainer>
        <Title>O mapa local de sua cidade</Title>
        <SubTitle>Encontre no comérciolocal tudo que precisa</SubTitle>

        <Link to='/new'>
          <Button>
            <ButtonBox>{">"}</ButtonBox>
            Cadastre um ponto comercial
          </Button>
        </Link>
      </LeftContainer>

      <RightContainer>
        <Image />
      </RightContainer>
    </Container>
  );
}
