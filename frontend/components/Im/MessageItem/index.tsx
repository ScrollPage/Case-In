import { renderTimestamp } from "@/utils/renderTimestamp";
import Link from "next/link";
import React, { memo } from "react";
import {
  Wrapper,
  Text,
  Title,
  Header,
  Time,
  Main,
  DocWrapper,
  DocName,
} from "./styles";

interface MessageItemProps {
  content: string;
  timestamp: string;
  full_name: string;
  isMy: boolean;
  url?: string;
}

const MessageItemComponent: React.FC<MessageItemProps> = ({
  full_name,
  content,
  timestamp,
  isMy,
  url,
}) => {
  return (
    <Wrapper isMy={isMy}>
      <Main>
        <Header>
          <Title>{full_name}</Title>
          <Time>{renderTimestamp(timestamp)}</Time>
        </Header>
        <Text>{content}</Text>
      </Main>
      {url && (
        <DocWrapper>
          <a
            href={url.substring(0, url.lastIndexOf("/"))}
            download=""
            title="Скачать документ"
          >
            <img src="/download.svg" alt="Вложенный документ" />
          </a>
          <DocName>
            {url.substring(url.lastIndexOf("/") + 1, url.length)}
          </DocName>
        </DocWrapper>
      )}
    </Wrapper>
  );
};

export const MessageItem = memo(MessageItemComponent);
