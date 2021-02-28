import { AchievementItem } from "@/components/Achievement/AchievementItem";
import React from "react";
import { Wrapper, Title, List } from "./styles";

const data: any = [
  { id: 1, title: "asasd", label: "adds", completed: true },
  { id: 2, title: "asasd", label: "adds", completed: false },
  { id: 3, title: "asasd", label: "adds", completed: false },
  { id: 4, title: "asasd", label: "adds", completed: false },
];

const renderAchievementItems = (data: any) =>
  data.map((item: any) => (
    <AchievementItem key={`achievement__item__key__${item.id}`} achievement={item} />
  ));

export const AchievementContainer = () => {
  return (
    <Wrapper>
      <Title>Достижения</Title>
      <List>{renderAchievementItems(data)}</List>
    </Wrapper>
  );
};
