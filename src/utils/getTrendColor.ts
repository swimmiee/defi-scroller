export const TREND_RED = "#F4361E";
export const TREND_GREEN = "#03C75A";
export const TREND_ORANGE = "#ff8c00";
export const TREND_GREY = "#72787F";
export const TREND_LIGHTGREY = "#A2A8AF";
export const TREND_BLUE = "#60a5fa";

export const getTrendColor = (value: number | boolean) => {
  if (typeof value === "boolean") {
    return value ? TREND_GREEN : TREND_RED;
  } else if (value > 0) {
    return TREND_GREEN;
  } else if (value < 0) {
    return TREND_RED;
  } else {
    return TREND_GREY;
  }
};
