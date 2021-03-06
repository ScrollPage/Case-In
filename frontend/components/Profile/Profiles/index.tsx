import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import {
  ProfilesContext,
  ProfilesProps as ContextProps,
} from "@/pages/profile";
import { User } from "@/types/user";
import { getAsString } from "@/utils/getAsString";
import { useRouter } from "next/router";
import React, { memo, useContext, useMemo, useState } from "react";
import useSWR from "swr";
import { ProfileItem } from "../ProfileItem";
import { Wrapper } from "./styles";
import deepEqual from "fast-deep-equal";

const renderRoles = (profiles: User[]) => {
  return profiles.map((profile) => {
    return (
      <ProfileItem
        key={`profileItem__key__${profile.id}`}
        id={profile.id}
        fullName={`${profile.first_name} ${profile.last_name}`}
        rate={profile.rate ?? "0"}
      />
    );
  });
};

interface ProfilesProps {}

const ProfilesComponent = ({}: ProfilesProps) => {
  const { profiles } = useContext(ProfilesContext) as ContextProps;
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const search = getAsString(query.search) ?? "";
  const sort = getAsString(query.sort);

  const apiLink = useMemo(() => {
    return `${search && `&last_name__contains=${search}`}${
      sort === "1" ? "&sort=rate" : ""
    }${sort === "2" ? "&sort=last_name" : ""}`;
  }, [query]);

  const { data, error } = useSWR(
    `/api/worker/?${apiLink[0] === "&" ? apiLink.substr(1) : apiLink}`,
    {
      initialData: deepEqual(query, serverQuery) ? profiles : undefined,
    }
  );

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки инициатив" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет инициатив" />
      ) : (
        renderRoles(data)
      )}
    </Wrapper>
  );
};

export const Profiles = memo(ProfilesComponent);
