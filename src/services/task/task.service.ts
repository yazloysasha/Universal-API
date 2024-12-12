import { ApiError } from "@errors";
import { IPagination } from "@types";
import { appDataSource } from "@main";
import { FullTask } from "./task.types";
import { Task, TaskStatus } from "@entities";

/**
 * Сервис для управления задачами
 */
export class TaskService {
  private taskRepository = appDataSource.getRepository(Task);

  /**
   * Получить все задачи
   */
  async getTasks({ pagination }: { pagination: IPagination }): Promise<{
    totalSize: number;
    tasks: FullTask[];
  }> {
    const [totalSize, tasks]: [number, FullTask[]] = await Promise.all([
      this.taskRepository.count(),
      this.taskRepository.find({
        skip: pagination.skip,
        take: pagination.limit,
        select: ["id", "content", "status"],
      }),
    ]);

    return {
      totalSize,
      tasks,
    };
  }

  /**
   * Заменить задачи
   */
  async replaceTasks({
    tasks,
  }: {
    tasks: Omit<FullTask, "id">[];
  }): Promise<void> {
    await this.taskRepository.delete({});

    await this.taskRepository.insert(tasks);
  }

  /**
   * Создать задачу
   */
  async createTask({
    content,
    status,
  }: {
    content: string;
    status: TaskStatus;
  }): Promise<FullTask> {
    const task = this.taskRepository.create({
      content,
      status,
    });

    await this.taskRepository.insert(task);

    return task;
  }

  /**
   * Получить задачу
   */
  async getTask({ taskId }: { taskId: string }): Promise<FullTask> {
    const task: FullTask | null = await this.taskRepository.findOne({
      where: { id: taskId },
      select: ["id", "content", "status"],
    });

    if (!task) throw ApiError.notFound();

    return task;
  }

  /**
   * Отредактировать задачу
   */
  async editTask({
    taskId,
    content,
    status,
  }: {
    taskId: string;
    content?: string;
    status?: TaskStatus;
  }): Promise<FullTask> {
    const updatedTaskResult = await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({ content, status })
      .where({ id: taskId })
      .returning(["id", "content", "status"])
      .execute();

    if (!updatedTaskResult.affected) throw ApiError.notFound();

    return updatedTaskResult.raw[0];
  }

  /**
   * Удалить задачу
   */
  async deleteTask({ taskId }: { taskId: string }): Promise<void> {
    const result = await this.taskRepository.delete({ id: taskId });

    if (!result.affected) throw ApiError.notFound();
  }
}
