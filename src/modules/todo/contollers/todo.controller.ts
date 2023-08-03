import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entities/todo.entity';

@Controller('rest/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async getOneAction(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === null) {
      throw new NotFoundException(`Todo with id: ${id} not exists`);
    }
    return todo;
  }

  @Post()
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateAction(
    @Param('id') id: number,
    @Body() { title, isCompleted = false }: UpdateDto,
  ): Promise<Todo | { error: string }> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id: ${id} not exists`);
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  async deleteAction(@Param('id') id: number): Promise<{ success: boolean }> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id: ${id} not exists`);
    }
    await this.todoService.remove(id);
    return {
      success: true,
    };
  }
}
