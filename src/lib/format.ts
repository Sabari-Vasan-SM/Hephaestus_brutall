export function inr(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

export function discountPct(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
