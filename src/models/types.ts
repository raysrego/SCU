// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'medical' | 'patient';
  specialization?: string;
  createdAt: Date;
}

export interface MedicalTeamMember {
  id: string;
  name: string;
  role: 'doctor' | 'secretary' | 'anesthesiologist' | 'nurse';
  specialization: string;
  email: string;
  phone: string;
  license?: string;
  createdAt: Date;
}

// Material types
export interface SurgicalMaterial {
  id: string;
  name: string;
  description: string;
  category: string;
  supplierIds: string[];
  unitPrice: number;
  stockQuantity: number;
  requiredApproval: boolean;
  createdAt: Date;
}

// Procedure types
export interface SurgicalProcedure {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // in minutes
  recommendedMaterials: string[]; // material IDs
  complexity: 'low' | 'medium' | 'high';
  createdAt: Date;
}

// Supplier types
export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  materials: string[]; // material IDs
  preferredPaymentTerms: string;
  createdAt: Date;
}

// Quote types
export interface PatientInfo {
  id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  email: string;
  address: string;
  isMinor: boolean;
  guardianInfo?: GuardianInfo;
  medicalHistory: string;
  comorbidities: string[];
  allergies: string[];
}

export interface GuardianInfo {
  name: string;
  relationship: string;
  contactNumber: string;
  email: string;
}

export interface QuoteMaterial {
  materialId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  supplierId: string;
  supplierName: string;
  hospitalRegistered: boolean;
}

export interface QuoteTeamMember {
  memberId: string;
  name: string;
  role: string;
  fee: number;
}

export interface QuoteRequest {
  id: string;
  patientInfo: PatientInfo;
  procedureId: string;
  procedureName: string;
  materials: QuoteMaterial[];
  medicalTeam: QuoteTeamMember[];
  hospitalAnesthesiologist: boolean;
  durationHours: number;
  bloodBagsNeeded: number;
  comorbidities: string[];
  additionalNotes: string;
  requestDate: Date;
  status: 'pending' | 'estimated' | 'approved' | 'rejected';
  doctorId: string;
}

export interface QuoteResponse {
  id: string;
  quoteRequestId: string;
  materialsCost: number;
  medicalTeamCost: number;
  hospitalFacilityCost: number;
  anesthesiaCost: number;
  bloodBankCost: number;
  additionalCosts: {
    description: string;
    amount: number;
  }[];
  totalEstimatedCost: number;
  validUntil: Date;
  notes: string;
  respondedBy: string;
  respondedDate: Date;
}

export interface QuoteReport {
  id: string;
  quoteRequest: QuoteRequest;
  quoteResponse: QuoteResponse;
  generatedDate: Date;
  generatedBy: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined';
}