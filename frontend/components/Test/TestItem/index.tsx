import { IQuestion } from "@/types/test";
import React, { useContext } from "react";
import { Wrapper, Title } from "./styles";
import { Radio, Input } from "antd";
import { Ctx } from "@/containers/test";

interface Props {
  question: IQuestion;
  id: number;
}

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export const TestItem: React.FC<Props> = ({ question, id }) => {
  const { state, update } = useContext(Ctx);
  return (
    <Wrapper>
      <Title>{`${id}) ${question.title}`}</Title>
      <Radio.Group
        value={state?.[id]}
        onChange={(e) => update({ ...state, [id]: e.target.value })}
      >
        {question.answers.map((answer) => (
          <Radio key={answer.id} style={radioStyle} value={answer.id}>
            {answer.option}
          </Radio>
        ))}
      </Radio.Group>
    </Wrapper>
  );
};
