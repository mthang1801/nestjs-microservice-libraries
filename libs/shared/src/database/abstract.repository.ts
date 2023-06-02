import { Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';

export abstract class AbstractRepository<TDocument> {
	protected abstract logger: Logger;
	protected connection = mongoose.connection;
	constructor(protected readonly primaryModel: Model<TDocument>, protected readonly replica1Model: Model<TDocument>) {}
}
