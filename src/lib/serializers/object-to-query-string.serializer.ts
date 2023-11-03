export type SerializableToQueryStringObject = {
  [key: string]:
    | SerializableToQueryStringObject
    | string
    | number
    | null
    | boolean;
};

export const objectToQueryStringSerializer = (
  obj: SerializableToQueryStringObject,
  prefix?: string
) => {
  const str: string[] = [];
  let p = "";
  for (p in obj) {
    if (Object.hasOwn(obj, p)) {
      const k = prefix ? prefix + "[" + p + "]" : p;
      const v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? objectToQueryStringSerializer(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v ?? "")
      );
    }
  }
  return str.join("&");
};
