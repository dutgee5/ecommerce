import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  // any type is used to avoid type checking   Router.Response<any, Record<string, any>> | undefined
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    // decode the token
    const decoded = jwt.verify(token, "your_secret"); // your_secret env
    if (typeof decoded !== "object" || !decoded?.userId) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ err: "Invalid Token" });
  }
}

// ürün eklerken tokeni doğrulayamadı buna bakılacak

export function verifySeller(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  // any type is used to avoid type checking   Router.Response<any, Record<string, any>> | undefined
  const role = req.role;
  if (role !== "seller") {
    return res.status(401).json({ message: "Access Denied" });
  }
  next();
}
