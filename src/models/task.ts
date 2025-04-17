import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * Task attributes interface
 */
export interface TaskAttributes {
  id?: number;
  title: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  userId: number;
}

/**
 * Task model class
 */
export class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public status!: 'Pending' | 'In Progress' | 'Completed';
  public priority!: 'Low' | 'Medium' | 'High';
  public date!: string;
  public userId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Initialize the Task model
 */
export const initTaskModel = (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true,
    }
  );
};
