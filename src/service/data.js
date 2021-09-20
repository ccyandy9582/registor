export const data = [
	{
		date    : new Date(),
		applier : [
			{
				name : 'andy',
				time : '1800 - 1930'
			},
			{
				name : 'bonnie',
				time : '1800 - 1930'
			},
			{
				name : 'killian',
				time : '1930 - 2100'
			}
		]
	},
	{
		date    : new Date('2021-09-18'),
		applier : [
			{
				name : 'candy',
				time : '1600 - 1800'
			},
			{
				name : 'danny',
				time : '0900 - 1100'
			}
		]
	}
];

export const avalibleTime = [
	{
		date : new Date(),
		time : [ '1800 - 1930', '1930 - 2100' ]
	},
	{
		date : new Date('2021-09-18'),
		time : [ '0900 - 1100', '1100 - 1300', '1600 - 1800' ]
	},
	{
		date: new Date('2021-09-11'),
		time: [ '0900 - 1100']
	},
	{
		date: new Date('2021-09-12'),
		time: [ '0900 - 1100', '1100 - 1300', '1600 - 1800' ]
	},
	{
		date: new Date('2021-09-13'),
		time: [ '0900 - 1100', '1100 - 1300']
	}
];
