import { PropsWithChildren } from "react";
import { getColorPerStatus } from "./const";

export type InfoCardProps = {
  status: "info" | "error";
};

const InfoCard = ({
  status = "info",
  children,
}: PropsWithChildren<InfoCardProps>) => {
  return (
    <div className="w-full flex justify-center p-3 ">
      <p className={`${getColorPerStatus(status)} rounded-md text-center p-5`}>
        {children}
      </p>
    </div>
  );
};

export default InfoCard;
