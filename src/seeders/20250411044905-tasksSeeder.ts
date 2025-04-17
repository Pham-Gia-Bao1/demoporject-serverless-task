import { QueryInterface } from 'sequelize';
import SequelizeStatic from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) => {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Create contact form',
        status: 'In Progress',
        priority: 'Low',
        date: new Date('2025-04-07T10:00:00').getTime(), // Timestamp
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fix login bug',
        status: 'Pending',
        priority: 'High',
        date: new Date('2025-04-08T15:30:00').getTime(),
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Design homepage',
        status: 'Completed',
        priority: 'Medium',
        date: new Date('2025-04-06T08:00:00').getTime(),
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) => {
    await queryInterface.bulkDelete('tasks', {}, {});
  }
};
