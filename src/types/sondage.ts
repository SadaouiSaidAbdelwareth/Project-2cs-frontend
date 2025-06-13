export interface Phase {
    id: number;
    name: string;
    real_cout: number;
    starting_date: string; // format: date
    estimated_ending_date: string; // format: date
    estimated_cout: number;
    depth?: number;
    estimated_depth?: number;
    sondage_id: number;
}

export interface Sondage { 
    id: number; // readOnly
    endroit: string; // required, maxLength: 255, minLength: 1
    started_date: string; // required, format: date
    estimated_cout: number; // required
    real_cout: number; // required
    days_estimated: string; // required, format: date
    depth?: number; // optional, min: -2147483648, max: 2147483647
    but: string; // required, minLength: 1
    phases?: Number[]; // readOnly
    days?: string; // readOnly
}

