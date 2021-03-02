import React, { useContext, useEffect } from "react";
import {
  Wrapper,
  Title,
  SubTitle,
  List,
  ChooseWrapper,
  TestLabel,
  TestLabelWrapper,
  CheckMark,
} from "./styles";
import { data } from "@/utils/testData";
import { IQuestion, ITest, ServerTest } from "@/types/test";
import { useRouter } from "next/router";
import { TestItem } from "@/components/Test/TestItem";
import { getAsString } from "@/utils/getAsString";
import { useStateContext } from "@/hooks/useStateCtx";
import { Button } from "@/components/UI/Button";
import { completeTest } from "@/store/actions/test";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ErrorMessage } from "@/components/UI/ErrorMessage";

export const { Ctx, Provider } = useStateContext<{ [key: number]: number }>({});

interface TestContainer {
  serverTests: ServerTest[] | null;
}

export const TestContainer: React.FC<TestContainer> = ({ serverTests }) => {
  const { query } = useRouter();
  const currentTest = Number(getAsString(query.test));

  const { data: testsData, error: testsError } = useSWR(`/api/worker/test/`, {
    initialData: serverTests,
  });

  if (testsError) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации об отделе" />
      </Wrapper>
    );
  }

  if (!testsData) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  } else {
    const currentServerTest = testsData.find(
      (item) => item.category === currentTest
    );

    return (
      <Wrapper>
        <Provider>
          <Title>Тесты</Title>
          <ChooseTest tests={data} serverTests={testsData} />
          {currentTest ? (
            currentServerTest?.is_passed ? (
              <SubTitle>Данный тест пройден</SubTitle>
            ) : (
              <TestInner test={currentTest} serverTest={currentServerTest} />
            )
          ) : (
            <SubTitle>Выберите тест</SubTitle>
          )}
        </Provider>
      </Wrapper>
    );
  }
};

const renderTestItems = (data: IQuestion[]) =>
  data.map((item, index) => (
    <TestItem
      key={`Test__item__key__${index}`}
      question={item}
      id={index + 1}
    />
  ));

interface TestInnerProps {
  test: number;
  serverTest?: ServerTest;
}

const TestInner: React.FC<TestInnerProps> = ({ test, serverTest }) => {
  const { state, update } = useContext(Ctx);
  const { push } = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    update({});
  }, [test]);

  const handleSent = () => {
    let value = 0;
    if (!data[test - 1].isHasAnswers) {
      value = 1;
    } else {
      value =
        data[test - 1].questions.reduce((acc, cur, i) => {
          if (cur.correctId === state[i + 1]) {
            return acc + 1;
          }
          return acc;
        }, 0) / data[test - 1].questions.length;
    }

    dispatch(completeTest(value * 100, serverTest?.id, serverTest?.category));
    push(
      {
        pathname: "/test",
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <>
      <SubTitle>{data[test - 1].name}</SubTitle>
      <List>{renderTestItems(data[test - 1].questions)}</List>
      {Object.keys(state).length == data[test - 1].questions.length && (
        <Button onClick={handleSent} myType="outline">
          Завершить тест
        </Button>
      )}
    </>
  );
};

interface ChooseProps {
  tests: ITest[];
  serverTests: ServerTest[];
}

const ChooseTest: React.FC<ChooseProps> = ({ tests, serverTests }) => {
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
      {tests.map((test) => {
        const currentServerTest = serverTests.find(
          (item) => item.category === test.id
        );
        return (
          <TestLabelWrapper>
            <TestLabel
              key={`test__label__key__${test.id}`}
              isActive={Number(query.test) === test.id}
              onClick={() => handleChoose(test.id)}
            >{`- ${test.name}`}</TestLabel>
            <div>
              {currentServerTest?.value !== 0 && `${currentServerTest?.value}%`}
              {currentServerTest?.is_passed && <CheckMark />}
            </div>
          </TestLabelWrapper>
        );
      })}
    </ChooseWrapper>
  );
};
