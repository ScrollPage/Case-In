import deepEqual from "fast-deep-equal";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import {
  CommandsContext,
  CommandsProps as ContextProps,
} from "@/pages/command";
import { ICommand } from "@/types/command";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React, { memo, useContext, useMemo, useState } from "react";
import useSWR from "swr";
import { CommandItem } from "../CommandItem";
import { Wrapper } from "./styles";

const renderCommands = (commands: ICommand[]) => {
  return commands.map((command) => {
    return (
      <CommandItem
        key={`commanditem__key__${command.info.id}`}
        id={command.id}
        name={command.name}
        rate={command.rate ?? "0"}
        numMembers={command.num_workers}
      />
    );
  });
};

interface CommandsProps {}

const CommandsComponent = ({}: CommandsProps) => {
  const { commands } = useContext(CommandsContext) as ContextProps;
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const search = getAsString(query.search) ?? "";
  const sort = getAsString(query.sort);

  const apiLink = useMemo(() => {
    return `${search && `&name__contains=${search}`}${
      sort === "1" ? "&sort=rate" : ""
    }${sort === "2" ? "&sort=name" : ""}`;
  }, [query]);

  const { data, error } = useSWR(
    `/api/depart/?${apiLink[0] === "&" ? apiLink.substr(1) : apiLink}`,
    {
      initialData: deepEqual(query, serverQuery) ? commands : undefined,
    }
  );

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки комманд" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет комманд" />
      ) : (
        renderCommands(data)
      )}
    </Wrapper>
  );
};

export const Commands = memo(CommandsComponent);
