import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    isAdmin: Boolean;
}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {type: Boolean, required: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);