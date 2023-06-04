import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Workbook } from 'exceljs';
import { join } from 'path';
@Injectable()
export class ExceljsService {
	private readonly logger = new Logger(ExceljsService.name);

	@Timeout(Date.now.toString(), 500)
	async excelTutorial() {
		try {
			const filepath = join(__dirname, '..', '..', '..', 'public', 'excel.xlsx');
			// await fsExtra.unlink(filepath);
			this.logger.debug('FilePath:: ' + filepath);
			const workbook = new Workbook();
			workbook.lastModifiedBy = 'MVT';
			workbook.created = new Date();
			workbook.modified = new Date();
			workbook.lastPrinted = null;
			workbook.views = [
				{
					x: 0,
					y: 0,
					width: 1200,
					height: 800,
					firstSheet: 0,
					activeTab: 0,
					visibility: 'visible'
				}
			];

			const firstSheet = workbook.addWorksheet('firstSheet', {
				properties: { tabColor: { argb: '1b3e75' } },
				headerFooter: { firstHeader: 'Hello Exceljs', firstFooter: 'Hello World' },
				pageSetup: { paperSize: 9, orientation: 'landscape' }
			});
			const secondSheet = workbook.addWorksheet('secondSheet', { properties: { tabColor: { argb: 'daf0a8' } } });
			workbook.removeWorksheet(secondSheet.id);
			await workbook.xlsx.writeFile(filepath);
		} catch (error) {
			this.logger.error(error.stack);
		}
	}
}
