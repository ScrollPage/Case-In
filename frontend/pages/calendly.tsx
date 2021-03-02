import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { CalendlyContainer } from "@/containers/calendly";
import { ICalendly } from "@/types/calendly";

export interface CalendlyProps {
  calendly: ICalendly[] | null;
}

export default function Calendly({ calendly }: CalendlyProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Расписание мероприятий</title>
      </Head>
      <CalendlyContainer calendly={calendly} />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CalendlyProps> = async (
  ctx
) => {
  ensureAuth(ctx);

  let calendly: ICalendly[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/worker/calendlytask/`)
    .then((response) => {
      calendly = response?.data ?? null;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      calendly,
    },
  };
};
