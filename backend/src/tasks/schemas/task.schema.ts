import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TaskStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed',
}

export enum TaskPriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

@Schema({ timestamps: true })
export class Task extends Document {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ type: String, enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;

    @Prop({ type: String, enum: TaskPriority, default: TaskPriority.MEDIUM })
    priority: TaskPriority;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
