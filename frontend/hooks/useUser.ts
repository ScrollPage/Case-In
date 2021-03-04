import Cookie from "js-cookie";

export const useUser = (): {
  userId: string,
  fullName: string,
  code: string,
  isCanBeMentor: string,
  isReady: string,
} => {
  const userId = Cookie.get('userId') ?? "";
  const firstName = Cookie.get('firstName') ?? "";
  const lastName = Cookie.get('lastName') ?? "";
  const code = Cookie.get('code') ?? "";
  const isCanBeMentor = Cookie.get('isCanBeMentor') ?? "";
  const isReady = Cookie.get('isReady') ?? "";

  const fullName = `${firstName} ${lastName}`

  return {
    userId,
    fullName,
    code,
    isCanBeMentor,
    isReady
  }
}