import * as Types from '../typeings';
import { Schema, Model, model } from 'mongoose';

const todoSchema: Schema<Types.Todo> = new Schema<Types.Todo>({
    content: String,
    isdone: Boolean
});

export const ToDoModel: Model<Types.Todo> = model<Types.Todo>('todolists', todoSchema);
