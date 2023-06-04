import { Injectable, Logger } from '@nestjs/common';
import { Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class EventsService {
	private readonly logger = new Logger(EventsService.name);
	constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
	getHello(): string {
		return 'Hello World!';
	}

	@Interval(Date.now.toString(), 10000)
	__() {
		this.logger.log('Interval every 10s');
	}

	@Timeout(Date.now.toString(), 500)
	___() {
		this.logger.log('Interval every 10s');

		this.addInterval('notification-loyalty', 5000);
	}

	addCronjob(name: string, seconds = '10') {
		const job = new CronJob(`${seconds} * * * * *`, () => {
			this.logger.warn(`Time ${seconds} for the job ${name}`);
		});

		this.schedulerRegistry.addCronJob(name, job);
		job.start();
	}

	deleteCron(name: string) {
		this.schedulerRegistry.deleteCronJob(name);
		this.logger.warn(`Cronjob ${name} has been deleted`);
	}

	addTimeout(name: string, milliseconds: number) {
		console.log(new Date('2023-06-06T06:14:30').getTime() - Date.now());
		console.log(name, milliseconds);
		const cb = () => {
			this.logger.warn(`Timeout ${milliseconds}s to execute job ${name} `);
		};

		const timeout = setTimeout(cb, milliseconds);
		this.schedulerRegistry.addTimeout(name, timeout);
	}

	addInterval(name: string, milliseconds: number) {
		const cb = () => {
			this.logger.warn(`interval ${milliseconds} to execute ${name} job`);
		};
		const interval = setInterval(cb, milliseconds);
		this.schedulerRegistry.addInterval(name, interval);
	}
}
