import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status-enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }
  async getBoardByID(id: number): Promise<Board> {
    const result = await this.boardRepository.findOne(id);
    if (result == null) {
      throw new NotFoundException(`id not found ${id}`);
    }
    return result;
  }
  async deleteBoard(user: User, id: number): Promise<void> {
    const result = await this.boardRepository.delete({ user, id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result', result);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardByID(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
  async getAllBoards(user: User): Promise<Board[]> {
    return this.boardRepository.find({
      where: { user: { id: user.id } },
    });
  }
}
