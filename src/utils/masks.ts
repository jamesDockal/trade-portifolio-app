export const currencyMask = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target as HTMLInputElement & { rawValue?: string };
  const nativeEvent = e.nativeEvent as InputEvent;

  if (!input.rawValue) input.rawValue = "";

  const isBackspace = nativeEvent.inputType === "deleteContentBackward";

  if (isBackspace) {
    input.rawValue = input.rawValue.slice(0, -1);
  } else {
    const newChar = nativeEvent.data;
    if (/\d/.test(newChar ?? "")) {
      input.rawValue += newChar;
    }
  }

  const number = parseFloat(input.rawValue) / 100;

  if (!isNaN(number) && input.rawValue.length > 0) {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
    input.value = formatted;
  } else {
    input.value = "";
  }
};
