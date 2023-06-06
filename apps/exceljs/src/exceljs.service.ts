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
			const wb = new Workbook();
			const ws = wb.addWorksheet('First Sheet', {
				properties: { showGridLines: false }
			});
			ws.getColumn(1).width = 30;

			ws.addTable({
				name: 'MyTable',
				ref: 'A1',
				style: {
					theme: 'TableStyleDark1',
					showRowStripes: false
				},
				columns: [
					{ name: 'Date', totalsRowLabel: 'Totals:', filterButton: true },
					{ name: 'Amount', totalsRowFunction: 'sum', filterButton: false }
				],
				rows: [
					[new Date('2019-07-20'), 70.1],
					[new Date('2019-07-21'), 70.6],
					[new Date('2019-07-22'), 70.1]
				]
			});

			const table = ws.getTable('MyTable');
			table.totalsRow = true;
			table.headerRow = true;
			table.ref = 'A2';
			table.addRow([new Date(2023, 6, 5), 79.2]);
			table.addRow([new Date(2023, 6, 4), 80.1]);
			table.addRow([new Date(2023, 6, 3), 78.5]);
			table.addColumn({ name: 'Letter', totalsRowFunction: 'custom', totalsRowFormula: 'ROW()', filterButton: true }, ['a', 'b', 'c', 'd'], 2);
			const column = table.getColumn(0);
			column.name = 'Datetime';
			column.filterButton = false;
			column.totalsRowLabel = 'Totals Amount';
			column.totalsRowFormula = 'ROW()';

			table.commit();

			wb.xlsx.writeFile(filepath);
		} catch (error) {
			this.logger.error(error.stack);
		}
	}

	async test() {
		const numbers = [1, 2, 3, 4, 5];
		const result = this.handleActionA(numbers);
		console.log(result);
		return result;
	}

	handleActionA(inputNumbers: number[]) {
		const data = {
			actionA: 'this is Action A',
			handledAt: new Date(),
			numbers: inputNumbers
		};
		return this.handleActionB(data);
	}

	handleActionB(data) {
		const result = {
			...data,
			numbers: data.numbers.map(this.multiple)
		};
		return result;
	}

	multiple(element) {
		return element * 2;
	}
}
