import mongoose, {Document, Schema} from 'mongoose';

//Definir interface
export interface MedicHistory {
    symptoms: string;
    drugs: string;
    medicalApp: string;
}

export interface MedicHistoryModel extends MedicHistory, Document {}

//Crear Schema con atributos
const MedicSchema: Schema = new Schema(
    {
    symptoms: {type: String, required: true },
    medicalApp:{type:String, required: true},
    drugs: {type: String, required:true},
    },

);

export default mongoose.model<MedicHistoryModel>('History', MedicSchema);