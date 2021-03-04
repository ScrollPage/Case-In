import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { ICommand } from "@/types/command";
import styled from "styled-components";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ResponsiveLine } from "@nivo/line";

const stat = [
  {
    name: "Соцаиальная шкала (лайки, комментарии и ...)",
    label: "Соцальная активность",
    min: 0,
    max: 100,
  },
  {
    name: "Рейтинг",
    label: "Рейтингу",
    min: 0,
    max: 5,
  },
  {
    name: "Кол-во выполненных достижений",
    label: "Достижениям",
    min: 0,
    max: 40,
  },
  {
    name: "Уровень удовлетворенности",
    label: "Удовлетворенность",
    min: 0,
    max: 10,
  },
  {
    name: "Шкала работы наставников",
    label: "Работе наставников",
    min: 0,
    max: 100,
  },
];

export interface StatisticsProps {
  commands: ICommand[] | null;
}

function pad(n: any) {
  return n < 10 ? "0" + n : n;
}

const getDat = (len: number) => {
  let dates = [];
  let date = new Date();

  for (let i = 0; i < len; i++) {
    let tempDate = new Date();
    tempDate.setDate(date.getDate() - i);
    let str = pad(tempDate.getDate()) + "/" + pad(tempDate.getMonth() + 1);
    dates.push(str);
  }

  return dates.reverse();
};

export default function Statistics({ commands }: StatisticsProps) {
  return (
    <MainLayout>
      <Head>
        <title>CORP.NET / Статистика</title>
      </Head>
      <div>
        <Title>Статистика по: </Title>
        {!commands ? (
          <ErrorMessage message="Ошибка загрузки статистики" />
        ) : commands.length === 0 ? (
          <EmptyMessage message="Нет комманд" />
        ) : (
          stat.map((item) => (
            <Chart
              commands={commands}
              name={item.name}
              label={item.label}
              min={item.min}
              max={item.max}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<StatisticsProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  let commands: ICommand[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/depart/`)
    .then((response) => {
      commands = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      commands,
    },
  };
};

export interface ChartProps {
  commands: ICommand[];
  name: string;
  label: string;
  min: number;
  max: number;
}

const Chart: React.FC<ChartProps> = ({ commands, name, label, min, max }) => {
  const renderArray = Array.from(
    { length: 7 },
    () => Math.random() * (max - min) + min
  );
  return (
    <>
      <Label>{label}</Label>
      <ChartWrapper>
        <ResponsiveLine
          data={commands.map((command) => ({
            id: command.name,
            data: getDat(7).map((item, index) => ({
              y: renderArray[index],
              x: item,
            })),
          }))}
          margin={{ top: 65, right: 20, bottom: 50, left: 45 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: name,
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: -65,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </ChartWrapper>
    </>
  );
};

export const Label = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  display: block;
  margin: 0;
  margin-bottom: 15px;
  text-align: center;
`;

export const ChartWrapper = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  margin-bottom: 40px;
`;
export const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 20px;
  @media (max-width: 900.98px) {
    font-size: 18px;
    line-height: 22px;
  }
`;
