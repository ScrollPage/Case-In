import React from "react";
import {
  Hr,
  Wrapper,
  Header,
  Title,
  SubTitle,
  Main,
  Inner,
  Text,
} from "./styles";
import Link from "next/link";

export const RegisterContainer = () => {
  return (
    <Wrapper>
      <Inner>
        <Header>
          <Title>Инструкция</Title>
          <SubTitle>
            Есть акаунт?{" "}
            <Link href="/">
              <a>Вход</a>
            </Link>
          </SubTitle>
        </Header>
        <Hr />
        <Main>
          <Text>
            Чтобы получить аккаунт вам нужно обратиться к работодателю и вам
            выдадут данные для входа.
          </Text>
          <Text>Подробности по номеру поддержки +7 (996) 949 42-16</Text>
        </Main>
      </Inner>
    </Wrapper>
  );
};
