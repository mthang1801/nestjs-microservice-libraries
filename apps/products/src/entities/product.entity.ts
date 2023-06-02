import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Product {
	@Prop()
	name: string;

	@Prop({ type: mongoose.Schema.Types.Decimal128, default: 0 })
	price: number;

	@Prop()
	stockAmount: number;
}
