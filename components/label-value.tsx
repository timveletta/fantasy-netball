import React from "react";
import Text from "@/components/text";

type LabelValueProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
};

const LabelValue = ({ label, children }: LabelValueProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-x-2">
      <Text.Label>{label}</Text.Label>
      <Text.Subheader>{children}</Text.Subheader>
    </div>
  );
};

export default LabelValue;
