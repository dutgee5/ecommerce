import { Router } from "express";
import {
  createUserSchema,
  loginUserSchema,
  usersTable,
} from "../../db/userSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();

    // @ts-ignore
    delete user.password; // burdaki password'u silme sebebimiz kullanıcıya password'u göndermemek returning ile dönen password'u silmek için

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
});

router.post("/login", validateData(loginUserSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ message: "Authentication fail" });
      return;
    }
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.status(401).json({ message: "Authentication fail" });
      return;
    }

    // create a token
    const token = jwt.sign(
      { userId: user.id, userRole: user.role },
      "your_secret", // env dosyasına alınacak ve oradan çekilecek gibi düşünülebilir
      { expiresIn: "30d" }
    );

    // @ts-ignore
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
});

export default router;
