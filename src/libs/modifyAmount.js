const modifyAmount = (amount) => {
  if (amount == null || isNaN(amount)) return "0.00";

  const amountString = amount.toString();
  const amountArray = amountString?.split(".");
  const modifiableAmount = amountArray[0];

  const modifiedAmount =
    modifiableAmount?.length > 3
      ? `${modifiableAmount.slice(-100, -3)},${modifiableAmount.slice(-3)}`
      : amount.toFixed(2);

  return modifiedAmount;
};

export default modifyAmount;