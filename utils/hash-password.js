import crypto from "crypto";

export default password => {
  const hash = crypto.createHash("sha1");
  hash.update(password);
  return hash.digest("hex");
};
