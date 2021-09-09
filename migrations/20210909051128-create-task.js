'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Tasks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			checked: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			priority: {
				allowNull: false,
				type: Sequelize.STRING
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: true,
				type: Sequelize.DATE
			},
			deleted_at: {
				allowNull: true,
				type: Sequelize.DATE
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Tasks')
	}
}
