import { Button } from "@/components/UI/Button";
import { Gant } from "@/components/UserTask/Gant";
import { TaskMain } from "@/components/UserTask/TaskMain";
import { useIsYour } from "@/hooks/useIsYour";
import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "./styles";

export interface UserTaskContainerProps {}

export const UserTaskContainer: React.FC<UserTaskContainerProps> = ({}) => {
  const { push, query } = useRouter();
  const isYourPage = useIsYour();

  const handleTask = () => {
    push({ pathname: `/profile/${query.ID}` }, undefined, {
      shallow: true,
    });
  };

  return (
    <Wrapper>
      <Button onClick={handleTask} width="218px" myType="outline">
        Назад
      </Button>
      <Gant />
      {!isYourPage && <TaskMain />}
    </Wrapper>
  );
};
