import { useRouter } from "next/navigation";
import React from "react";

type IsPreReleaseProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const IsPreRelease = ({ children, fallback }: IsPreReleaseProps) => {
  const isPreRelease = process.env.NEXT_PUBLIC_IS_PRE_RELEASE === "true";

  return <>{isPreRelease ? children : fallback}</>;
};

const IsPreReleaseRoute = (component: React.JSX.Element) => {
  const router = useRouter();
  if (process.env.NEXT_PUBLIC_IS_PRE_RELEASE === "true") return component;
  router.push("/");
};

export default IsPreRelease;
export { IsPreReleaseRoute };
