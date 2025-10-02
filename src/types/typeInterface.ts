export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name: string;
  email: string;
  message: string;
}

export interface TouchedFields {
  name: boolean;
  email: boolean;
  message: boolean;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export interface Skill {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Award {
  number: string;
  text: string;
}

export interface FAQ {
  q: string;
  a: string;
}