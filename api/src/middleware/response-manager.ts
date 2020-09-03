import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { ExportFailedException } from '../exceptions';

/**
 *  middleware to manage actions on responses such as
 * export / import and caching
 * @todo move caching into here.
 *
 */

const responseManager: RequestHandler = asyncHandler(async (req, res, next) => {
	if (!req.query.export) {
		res.json(res.locals.data);
		return next();
	}
	// only want to export out on get
	if (req.method == 'GET') {
		const exportType = req.query.export;

		if (exportType == 'json') {
			// have chosen to export json
		}

		if (exportType == 'csv') {
			// have chosen to export csv
			const json2csv = require('json2csv');

			const exportData = res.locals.data;

			const fieldsOut = Object.keys(exportData);
			const csv = await json2csv.parse(exportData, fieldsOut);

			res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
			res.set('Content-Type', 'text/csv');
			res.status(200).send(csv);
		}
	}

	return next();
});

export default responseManager;
