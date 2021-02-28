import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { GetServerSideProps } from "next";
import { ensureAuth } from "@/utils/ensure";
import { instanceWithSSR } from "@/api";
import { CalendlyContainer } from "@/containers/calendly";

export interface CalendlyProps {}

export default function Calendly({}: CalendlyProps) {
  return (
    <MainLayout>
      <Head>
        <title>BNET / Расписание мероприятий</title>
      </Head>
      <CalendlyContainer />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CalendlyProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  return {
    props: {},
  };
};
