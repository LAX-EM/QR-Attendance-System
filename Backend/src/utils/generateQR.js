import crypto from "crypto";

export const generateQRToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
