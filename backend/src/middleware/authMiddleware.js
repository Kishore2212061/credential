import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET||"superset";

export const auth = (roles = []) => {
  return (req, res, next) => {
    const h = req.headers.authorization || "";
    const token = h.startsWith("Bearer ") ? h.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const decoded = jwt.verify(token, SECRET); // { id, role }
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid/expired token" });
    }
  };
};