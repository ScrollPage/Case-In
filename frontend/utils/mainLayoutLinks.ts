interface LinkType {
  href: string;
  pathname: string;
  label: string;
}

export const mainLoyoutLinks = (userId: number): LinkType[] => {

  const links: LinkType[] = [
    {
      href: `/profile/${userId}`,
      pathname: "/profile/[ID]",
      label: "Профиль",
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
      href: `/calendly`,
      pathname: "/calendly",
      label: "Календарь",
    },
    {
      href: `/profile/${userId}/achievement`,
      pathname: "/achievement",
      label: "Достижения",
    },
    {
      href: `/test`,
      pathname: "/test",
      label: "Тесты",
    },
    {
      href: "/learn",
      pathname: "/learn",
      label: "Обучение",
    },
  ];

  return links
}