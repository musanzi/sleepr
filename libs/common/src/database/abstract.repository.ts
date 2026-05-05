import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export abstract class AbstractRepository<TEntity extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly entityRepository: Repository<TEntity>) {}

  async create(dto: DeepPartial<TEntity>): Promise<TEntity> {
    try {
      const entity = this.entityRepository.create(dto);
      return await this.entityRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Unable to create the resource');
    }
  }

  async findAll(): Promise<TEntity[]> {
    return await this.entityRepository.find();
  }

  async findOne(id: string): Promise<TEntity> {
    try {
      return await this.entityRepository.findOneOrFail({
        where: { id } as FindOptionsWhere<TEntity>
      });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Unable to find the resource');
    }
  }

  async update(id: string, dto: DeepPartial<TEntity>): Promise<TEntity> {
    try {
      const entity = await this.findOne(id);
      const updatedEntity = this.entityRepository.merge(entity, dto);
      return await this.entityRepository.save(updatedEntity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Unable to update the resource');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const entity = await this.findOne(id);
      await this.entityRepository.remove(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Unable to delete the resource');
    }
  }
}
