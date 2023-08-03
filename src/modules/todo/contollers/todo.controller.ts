import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { CreateDto, UpdateDto } from './dto';

@Controller('rest/todo')
export class TodoController {
  @Get()
  getAllAction(): string {
    return 'hello all ';
  }

  @Get(':id')
  getOneAction(@Param('id') id: string): string {
    return `hello one id: ${id}`;
  }

  @Post()
  createAction(@Body() todo: CreateDto): CreateDto {
    return todo;
  }

  @Put(':id')
  saveAction(@Param('id') id: string, @Body() todo: UpdateDto): UpdateDto {
    return todo;
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string): string {
    return `Delete id: ${id}`;
  }
}
