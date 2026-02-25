import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
        return this.tasksService.create(createTaskDto, req.user._id);
    }

    @Get()
    findAll(@Request() req, @Query('status') status?: string) {
        return this.tasksService.findAll(req.user._id, status);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
        return this.tasksService.update(id, req.user._id, updateTaskDto);
    }

    @Patch(':id/toggle')
    toggleStatus(@Param('id') id: string, @Request() req) {
        return this.tasksService.toggleStatus(id, req.user._id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.tasksService.remove(id, req.user._id);
    }
}
