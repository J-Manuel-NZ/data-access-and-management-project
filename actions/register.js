"use server"
import connectDB from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const register = async (values) => {
    const { email, password, name, role } = values;

    try {
        await connectDB();
        const userFound = await User.findOne({ email });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          role,
        });
        const savedUser = await user.save();
        const plainUser = savedUser.toObject();

        // Remove non-serializable fields
        delete plainUser._id;
        delete plainUser.__v;
        delete plainUser.password;

        return plainUser;

    }catch(e){
        console.log(e);
    }
}