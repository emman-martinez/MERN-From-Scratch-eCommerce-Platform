import type { ReactNode } from "react";

export type MessageProps = {
  children: ReactNode;
  variant?: string;
};

export type FormContainerProps = {
  children: ReactNode;
};

export type CheckoutStepsProps = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};
