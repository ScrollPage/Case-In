interface LinkType {
  href: string;
  pathname: string;
  label: string;
}

export const mainLoyoutLinks = (userId: number): LinkType[] => {

  const links: LinkType[] = [
    {
      href: "/feed",
      pathname: "/feed",
      label: "Лента",
    },
    {
      href: `/profile/${userId}`,
      pathname: "/profile/[ID]",
      label: "Профиль",
    },
    {
      href: `/achievement`,
      pathname: "/achievement",
      label: "Достижения",
    },
    {
      href: `/calendly`,
      pathname: "/calendly",
      label: "Календарь",
    },
    {
      href: `/test`,
      pathname: "/test",
      label: "Тесты",
    },
    {
      href: "/im",
      pathname: "/im",
      label: "Мессенджер",
    },
    {
      href: "/profile",
      pathname: "/profile",
      label: "Сотрудники",
    },
    {
      href: "/command",
      pathname: "/command",
      label: "Отделы",
    },
    {
      href: "/learn",
      pathname: "/learn",
      label: "Обучение",
    },
  ];

  return links
}