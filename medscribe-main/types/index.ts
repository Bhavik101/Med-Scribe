export interface IProfile {
  first_name: string;
  last_name: string;
  birthday: string;
  gender: string;
  $id: string;
  role: "doctor" | "patient";
  type?: string;
}
export interface IDisease {
  name: string;
  description: string;
  slug: string;
  symptoms?: string[];
  remedies?: string[];
  severity?: boolean;
}
export interface IDiseasesResponse {
  message: string;
  error: boolean;
  data: {
    total: number;
    documents: IDisease[];
  };
}

export interface IMedicalHistory {
  diagnosis: string;
  remark: string;
  doctor: string;
  place: string;
  $createdAt: string;
  $id: string;
}
export interface IMedicalResponse {
  total: number;
  documents: IMedicalHistory[];
}
