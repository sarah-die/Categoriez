import { useEffect } from "react";
import { contextType } from "../../Context";

export const useSaveDataToSessionStorage = <T extends keyof contextType>(
  dataKey: T,
  data: contextType[T]
) => {
  useEffect(() => {
    sessionStorage.setItem(dataKey, JSON.stringify(data));
  }, [data]);
};
