'use strict'

module.exports = {
	up: async queryInterface => {
		return queryInterface.sequelize.transaction(t => {
			return queryInterface.changeColumn(
				'Tasks',
				'owner_id',
				{
					type: 'INTEGER USING CAST("owner_id" as INTEGER)'
				},
				{ transaction: t }
			)
		})
	}
}
