export interface Position {
  id: string;
  code: string;
  title: string;
}

export interface SearchVacancyPayload {
  salaryFrom: number;
  salaryTo: number;
  schedule: VacancySchedule;
  skills: string[]; // UUID IDs
  page: number;
}

export interface SearchVacancyResponse {
  count: number;
  vacancies: Vacancy[];
}

export enum VacancySchedule {
  FULL_TIME = "FULL_TIME",
  INTERN = "INTERN",
  REMOTE = "REMOTE",
  SEASONAL = "SEASONAL",
  PART_TIME = "PART_TIME",
  PROJECT = "PROJECT",
  SHIFT = "SHIFT",
  HYBRID = "HYBRID",
  OFFICE = "OFFICE",
}

export enum VacancyProvider {
  ROBOTA_UA = "ROBOTA_UA",
}

export interface VacancyCategory {
  id: string;
  parent_category_id: string | null;
  name: string;
  provider: VacancyProvider;
  provider_id: string;
  create_at: Date;
  updated_at: Date;
}

export interface Skill {
  id: string;
  en_name: string;
  uk_name: string;
}

export interface Specialty {
  id: string;
  en_name: string;
  uk_name: string;
}

export interface Vacancy {
  id: string;
  title: string;
  logo: string | null;
  salary: number;
  salaryFrom: number;
  salaryTo: number;
  cityName: string;
  companyName: string;
  shortDescription: string;
  description: string;
  schedule: VacancySchedule;
  publish_at: string;
  category: VacancyCategory;
  recommended_skills: Skill[];
}

export interface Position {
  id: string;
  code: string;
  title: string;
}

export interface UserInfo {
  graduated_university: boolean;
  previous_experience: string | null;
  fullName: string;
  position: Position | null;
}

export interface User {
  id: string;
  email: string;
  coreData: UserInfo | null;
  skills: Skill[];
  specialty: Specialty | null;
  desired_specialties: Specialty[];
}
