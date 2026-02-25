import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskStatus } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const newTask = new this.taskModel({
            ...createTaskDto,
            userId: new Types.ObjectId(userId),
        });
        return newTask.save();
    }

    async findAll(userId: string, status?: string): Promise<Task[]> {
        const filter: any = { userId: new Types.ObjectId(userId) };
        if (status && status !== 'All') {
            filter.status = status;
        }
        return this.taskModel.find(filter).sort({ createdAt: -1 }).exec();
    }

    async update(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskModel.findOneAndUpdate(
            { _id: id, userId: new Types.ObjectId(userId) },
            updateTaskDto,
            { new: true }
        );
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    async toggleStatus(id: string, userId: string): Promise<Task> {
        const task = await this.taskModel.findOne({ _id: id, userId: new Types.ObjectId(userId) });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        task.status = task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING;
        return task.save();
    }

    async remove(id: string, userId: string): Promise<any> {
        const result = await this.taskModel.deleteOne({ _id: id, userId: new Types.ObjectId(userId) });
        if (result.deletedCount === 0) {
            throw new NotFoundException('Task not found');
        }
        return result;
    }
}
