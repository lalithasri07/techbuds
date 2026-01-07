
export enum PregnancyStage {
  FIRST_TRIMESTER = 'First Trimester',
  SECOND_TRIMESTER = 'Second Trimester',
  THIRD_TRIMESTER = 'Third Trimester'
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  trimester: 1 | 2 | 3;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  category: 'Bump' | 'Scan' | 'Nursery' | 'Wellness';
  imageUrl?: string;
}

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface SymptomRecord {
  id: string;
  date: string;
  symptom: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
}

export interface UserProfile {
  name: string;
  dueDate: string;
  currentWeek: number;
  personalPhone: string;
  location: string;
  emergencyContacts: EmergencyContact[];
  tasks: Task[];
  journal: JournalEntry[];
  weightLog: WeightRecord[];
  symptoms: SymptomRecord[];
}

export interface Product {
  id: string;
  name: string;
  category: 'Nutrition' | 'Hygiene' | 'Maternity' | 'Medical';
  price: string;
  image: string;
  description: string;
  stage: string;
}
