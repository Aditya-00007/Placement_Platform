import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
  const authtoken = req.header("Authorization");

  if (!authtoken) return res.status(401).json({ msg: "No token" });

  try {
    const token = authtoken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export const isCandidate = (req, res, next) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({ msg: "Access denied (Candidate only)" });
  }
  next();
};

export const isEmployer = (req, res, next) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ msg: "Access denied (Employer only)" });
  }
  next();
};
