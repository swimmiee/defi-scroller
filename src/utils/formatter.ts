// https://docs.w3cub.com/javascript/global_objects/intl/numberformat/numberformat

export const commaFormat = (
  value: number | string | null,
  places: number = 18
) => {
  const parts = (+(value ?? 0)).toFixed(places).split(".");
  parts[0] = (parts[0].replace(/^0+/, "") || "0").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  parts[1] = (parts[1] ?? "").slice(0, places).replace(/0*$/, "");
  if (!parts[1]) parts.pop();
  return parts.join(".");
};

export const formatInProcess = (value: string, decimals: number) => {
  if (value === "") return value;
  if (value[value.length - 1] === ".") return commaFormat(value) + "."; // 소수점 입력 안 했을 때 '3.'
  return commaFormat(value, decimals);
};

/** (display용) 0이면 {displayOnZero}값으로, 0보다 크고 1e-6보다 작으면 <0.000001로, 크면 comma 표기한다. */
export const formatOrfloorTiny = (
  value: string | number | null,
  displayOnZero: string = "0.0",
  threshold: number = 1e-6
): string => {
  value = value ?? 0;
  return +value >= 1e-6
    ? commaFormat(value, 6)
    : +value
    ? `<${threshold}`
    : displayOnZero;
};

export const percFormat = new Intl.NumberFormat("en-US", {
  style: "percent",
  // signDisplay: "never",
  maximumFractionDigits: 2,
}).format;

export const compactFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
}).format;

export const toFixedCond = (num: string | number | null, fixedBase = 0) => {
  const n = +(num ?? 0);
  return commaFormat(
    n,
    Math.max(
      (n < 1e-8 ? 10 : n < 1e-6 ? 8 : n < 1e-4 ? 6 : n < 1e-2 ? 4 : 2) +
        fixedBase,
      0
    )
  );
};

export const dollar = (num: string | number | null, abs?: boolean) => {
  num = num ?? 0;
  if (abs) num = Math.abs(+num);
  return num && +num > 0 && +num < 0.01 ? "$<0.01" : `$${commaFormat(num, 2)}`;
};

interface DateFormatParams {
  date?: boolean;
  time?: boolean;
  year?: boolean;
  second?: boolean;
}

export const dateFormat = (d: Date, p?: DateFormatParams) =>
  new Intl.DateTimeFormat(undefined, {
    month: p?.date ? "numeric" : undefined,
    day: p?.date ? "numeric" : undefined,
    year: p?.date && !(p?.year === false) ? "numeric" : undefined,
    hour: p?.time ? "numeric" : undefined,
    minute: p?.time ? "numeric" : undefined,
    second: p?.time && !(p?.second === false) ? "numeric" : undefined,
  }).format(d);
