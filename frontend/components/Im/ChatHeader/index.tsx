import { Avatar } from "@/components/UI/Avatar";
import React, { memo, useContext, useMemo, useState } from "react";
import { Wrapper, Hero, Name, Close } from "./styles";
import deepEqual from "fast-deep-equal";
import { ImProps, ImContext } from "@/pages/im";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";
import Link from "next/link";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { useUser } from "@/hooks/useUser";

const ChatHeaderComponent = () => {
  const { currentChat } = useContext(ImContext) as ImProps;
  const { query, push } = useRouter();
  const { userId } = useUser();

  const chatId = getAsString(query.id);
  const [serverQuery] = useState(query);

  const { error, data } = useSWR(`/api/chat/${chatId}`, {
    initialData: deepEqual(query, serverQuery) ? currentChat : undefined,
  });

  const dialogInfo = useMemo(() => {
    if (data) {
      if (data.is_chat) {
        if (Number(userId) === data.members[0].id) {
          return {
            name: `${data.members[1].first_name} ${data.members[1].last_name}`,
            id: data.members[1].id,
          };
        } else {
          return {
            name: `${data.members[0].first_name} ${data.members[0].last_name}`,
            id: data.members[0].id,
          };
        }
      } else {
        return {
          name: data.name,
          id: data.depart,
        };
      }
    } else {
      return {
        name: "",
        id: "",
      };
    }
  }, [data, error]);

  const handleClose = () => {
    push({ pathname: "/im" }, undefined, {
      shallow: true,
    });
  };

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage message="Ошибка загрузки информации о пользователе" />
      </Wrapper>
    );
  }

  if (!data) {
    return <Wrapper />;
  } else {
    return (
      <Wrapper>
        <Hero>
          <Avatar size={60} href={`/profile/${dialogInfo.id}`} />
          <Name>
            <Link href={`/profile/${dialogInfo.id}`}>
              <a>{dialogInfo.name}</a>
            </Link>
          </Name>
        </Hero>
        <Close onClick={handleClose} />
      </Wrapper>
    );
  }
};

export const ChatHeader = memo(ChatHeaderComponent);
