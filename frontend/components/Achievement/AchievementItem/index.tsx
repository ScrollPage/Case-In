import React from "react";
import { Wrapper, Main, Title, SubTitle } from "./styles";

interface Props {
  achievement: any;
}

export const AchievementItem: React.FC<Props> = ({ achievement }) => {
  return (
    <Wrapper isCompleted={achievement.completed} >
      <img src="/train.svg" alt="Достижение" />
      <Main>
        <Title>{achievement.title}</Title>
        <SubTitle>{achievement.label}</SubTitle>
      </Main>
    </Wrapper>
  );
};
