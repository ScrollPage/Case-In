import React, { useContext, useEffect } from "react";
import {
  Wrapper,
  Title,
  SubTitle,
  List,
  ChooseWrapper,
  TestLabel,
} from "./styles";
import { data } from "@/utils/testData";
import { IQuestion, ITest } from "@/types/test";
import { useRouter } from "next/router";
import { TestItem } from "@/components/Test/TestItem";
import { getAsString } from "@/utils/getAsString";
import { useStateContext } from "@/hooks/useStateCtx";
import { Button } from "@/components/UI/Button";

const renderTestItems = (data: IQuestion[]) =>
  data.map((item, index) => (
    <TestItem
      key={`Test__item__key__${index}`}
      question={item}
      id={index + 1}
    />
  ));

export const { Ctx, Provider } = useStateContext<{ [key: number]: number }>({});

export const TestContainer = () => {
  const { query } = useRouter();
  const currentTest = Number(getAsString(query.test));
  return (
    <Wrapper>
      <Provider>
        <Title>Тесты</Title>
        <ChooseTest tests={data} />
        {currentTest ? (
          <TestInner test={currentTest} />
        ) : (
          <SubTitle>Выберите тест</SubTitle>
        )}
      </Provider>
    </Wrapper>
  );
};

interface TestInnerProps {
  test: number;
}

const TestInner: React.FC<TestInnerProps> = ({ test }) => {
  const { state, update } = useContext(Ctx);
  useEffect(() => {
    update({});
  }, [test]);
  return (
    <>
      <SubTitle>{data[test - 1].name}</SubTitle>
      <List>{renderTestItems(data[test - 1].questions)}</List>
      {Object.keys(state).length == data[test - 1].questions.length && (
        <Button myType="outline">Завершить тест</Button>
      )}
    </>
  );
};

interface ChooseProps {
  tests: ITest[];
}

const ChooseTest: React.FC<ChooseProps> = ({ tests }) => {
  const { push, query } = useRouter();

  const handleChoose = (testId: number) => {
    push(
      {
        pathname: "/test",
        query: {
          test: testId,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <ChooseWrapper>
      {tests.map((test) => (
        <TestLabel
          isActive={Number(query.test) === test.id}
          onClick={() => handleChoose(test.id)}
          key={`test__label__key__${test.id}`}
        >{`- ${test.name}`}</TestLabel>
      ))}
    </ChooseWrapper>
  );
};
