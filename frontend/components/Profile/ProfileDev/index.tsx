import React, { memo } from "react";
import { Wrapper, Title, Percent } from "./styles";

const ProfileDevComponent = () => {
  return (
    <Wrapper percent={20}>
      <Title>Процент выполненных достижений</Title>
      <Percent>{20}</Percent>
    </Wrapper>
  );
};

export const ProfileDev = memo(ProfileDevComponent);
