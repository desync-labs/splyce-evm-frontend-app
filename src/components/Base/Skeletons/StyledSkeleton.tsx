import { FC } from "react";
import { Skeleton, styled } from "@mui/material";

export const CustomSkeleton = styled(Skeleton)`
  background-color: #072a404a;
`;

export const BaseSkeletonValue = styled(Skeleton)`
  background-color: #7b9ea626;
`;

type StatsValueSkeletonProps = {
  width?: number | string;
  height?: number | string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  animation?: "pulse" | "wave" | false;
  marginTop?: string;
};

export const StatsValueSkeleton: FC<StatsValueSkeletonProps> = ({
  width = 200,
  height = 28,
  variant = "rounded",
  animation = "wave",
  marginTop = "0",
}) => {
  return (
    <Skeleton
      variant={variant}
      animation={animation}
      width={width}
      height={height}
      sx={{ bgcolor: "#072a404a", marginTop }}
    />
  );
};
