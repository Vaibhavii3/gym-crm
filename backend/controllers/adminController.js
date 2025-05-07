import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin already exists" });
        }

        const newAdmin = new Admin({ name, email, password }); // Let schema hash it
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Admin registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, admin: { name: admin.name, email: admin.email } });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAdminProfile = async (req, res) => {
    const admin = req.admin;
    res.status(200).json(admin);
};
