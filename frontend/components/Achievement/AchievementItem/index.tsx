import { IAchieve } from "@/types/achieve";
import { achieveData } from "@/utils/achieveData";
import React from "react";
import { Wrapper, Main, Title, SubTitle } from "./styles";

interface Props {
  achievement: IAchieve;
}

export const AchievementItem: React.FC<Props> = ({ achievement }) => {
  return (
    <Wrapper isCompleted={achievement.done}>
      <img src={achievement.url} alt={achieveData[achievement.name - 1].name} />
      <Main>
        <Title>{achieveData[achievement.name - 1].name}</Title>
        <SubTitle>{achieveData[achievement.name - 1].description}</SubTitle>
      </Main>
    </Wrapper>
  );
};
