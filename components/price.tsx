import React from "react";

type PriceProps = {
  price: number;
};

const Price = ({ price }: PriceProps) => {
  const thousands = Math.abs(Math.floor(price / 1000));

  return (
    <span>
      {price < 0 && "-"}${thousands}
      <sub className="opacity-60 bottom-0">000</sub>
    </span>
  );
};

export default Price;
