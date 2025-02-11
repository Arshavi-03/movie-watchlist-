// models/user.model.ts
import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    image: {
        type: String,
        default: '',
    },
    watchlist: [{
        movieId: String,
        addedAt: Date,
        status: {
            type: String,
            enum: ['plan_to_watch', 'watching', 'completed', 'dropped'],
            default: 'plan_to_watch'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

const User = models.User || model('User', userSchema);

export default User;