import Cookie from "js-cookie";

export const useUser = (): {
  userId: string,
  fullName: string,
} => {
  const userId = Cookie.get('userId') ?? "";
  const firstName = Cookie.get('firstName') ?? "";
  const lastName = Cookie.get('lastName') ?? "";

  const fullName = `${firstName} ${lastName}`

  return {
    userId,
    fullName,
  }
}