import mongoose from 'mongoose';

export interface IStudent {
  fullName: string;
  phoneNumber: string;
  campus: string;
  role: 'main-leader' | 'evangelism-mobilizer';
  registeredAt: Date;
}

const studentSchema = new mongoose.Schema<IStudent>({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  campus: {
    type: String,
    required: [true, 'Campus is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['main-leader', 'evangelism-mobilizer' ],
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if model exists before creating a new one (for Next.js hot reload)
const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);

export default Student;