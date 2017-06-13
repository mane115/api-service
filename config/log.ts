export default {
	appenders: [{
		type: 'console'
	}, {
		type: 'dateFile',
		filename: 'logs/common',
		category: 'common',
		pattern: "-yyyy-MM-dd.log",
		alwaysIncludePattern: true,
	}, {
		type: 'dateFile',
		filename: 'logs/api',
		category: 'api',
		pattern: "-yyyy-MM-dd.log",
		alwaysIncludePattern: true,
	}, {
		type: 'dateFile',
		filename: 'logs/collection',
		category: 'collection',
		pattern: "-yyyy-MM-dd.log",
		alwaysIncludePattern: true,
	}]
};