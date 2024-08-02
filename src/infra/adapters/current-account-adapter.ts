import { IUser } from "../interfacess/user";



export const setCurrentAccountAdapter = async (
  account: IUser | null
) => {
  const value = account ? JSON.stringify(account) : "";
  await localStorage.setItem("users", value);
};

export const getCurrentAccountAdapter =
  async (): Promise<IUser | null> => {
    const account = await localStorage.getItem("users");
    if (account) {
      return JSON.parse(account);
    }
    return null;
  };
