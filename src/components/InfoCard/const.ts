import { InfoCardProps } from "./InfoCard";

export const getColorPerStatus = (status: InfoCardProps["status"]) => {
  switch (status) {
    case "info":
      return "bg-gray-600";
    case "error":
      return "bg-red-500";
  }
};
