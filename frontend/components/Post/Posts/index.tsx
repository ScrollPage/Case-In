import React, { createContext, memo, useContext, useMemo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { PostItem } from "@/components/Post/PostItem";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import useSWR from "swr";
import { useRouter } from "next/router";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { IPost } from "@/types/post";
import { PostAdd } from "../PostAdd";
import { useUser } from "@/hooks/useUser";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";

const renderPosts = (posts: IPost[], isAdmin: boolean) => {
  return posts.map((post) => {
    return (
      <PostItem
        isAdmin={isAdmin}
        key={`postitem__key__${post.id}`}
        id={post.id}
        title={post.title}
        depart={post.depart}
        picture={post.picture}
        num_likes={post.num_likes}
        is_liked={post.is_liked}
        timestamp={post.timestamp}
        last_comment={post.last_comment}
        num_comments={post.num_comments}
      />
    );
  });
};

interface PostsProps {}

const PostsComponent: React.FC<PostsProps> = ({}) => {
  const { posts, command } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();
  const { userId } = useUser();

  const { data: departData, error: departError } = useSWR(
    `/api/depart/${query.ID}/`,
    {
      initialData: command,
    }
  );

  const { data, error } = useSWR(`/api/depart/${query.ID}/post/`, {
    initialData: posts,
  });

  const isAdmin = useMemo(
    () =>
      departData && !departError
        ? departData.admin.id === Number(userId)
        : false,
    [departError, departData]
  );

  return (
    <Wrapper>
      <Title>Объявления</Title>
      {/* @ts-ignore */}
      {isAdmin && <PostAdd />}
      <Inner>
        {error ? (
          <ErrorMessage message="Ошибка загрузки объявлений" />
        ) : !data ? (
          <LoadingSpinner />
        ) : data.length === 0 ? (
          <EmptyMessage message="Нет объявлений" />
        ) : (
          renderPosts(data, isAdmin)
        )}
      </Inner>
    </Wrapper>
  );
};

export const Posts = memo(PostsComponent);
