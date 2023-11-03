import { HttpError } from "@/lib/type";

export const httpErrorSerializer = (data: HttpError) =>
  Array.isArray(data.message) ? data.message.join("\n") : data.message;
