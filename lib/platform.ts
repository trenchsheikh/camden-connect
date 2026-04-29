export type MentorType = "career" | "life" | "sport";

export type MentorApplication = {
  fullName: string;
  email: string;
  linkedinUrl: string;
  company: string;
  role: string;
  offers: MentorType[];
  timeCommitment: string;
  motivation: string;
  referenceName: string;
  referenceEmail: string;
  signedConduct: boolean;
  status: "pending" | "approved";
};

export type Mentor = {
  id: string;
  name: string;
  company: string;
  role: string;
  mentorType: MentorType;
  bio: string;
};

export const clubCode = "CAMDEN-CONNECT-2026";

export const codeOfConduct = [
  "Treat each other with respect and confidentiality.",
  "Meet only in public locations, never private homes.",
  "No financial transactions between mentor and mentee.",
  "No romantic or sexual advances of any kind.",
  "Use in-platform messaging for first contact.",
  "Report anything uncomfortable using the flag button.",
  "If you cannot continue, inform the operator quickly.",
];

export const sampleMentors: Mentor[] = [
  {
    id: "m1",
    name: "Aisha Grant",
    company: "BBC",
    role: "Producer",
    mentorType: "career",
    bio: "Supports pathways into media and communication roles.",
  },
  {
    id: "m2",
    name: "Marcus Bell",
    company: "NHS",
    role: "Mental Health Practitioner",
    mentorType: "life",
    bio: "Focuses on routine, resilience, and confidence.",
  },
  {
    id: "m3",
    name: "Jordan Ellis",
    company: "QPR Academy",
    role: "Player Development Coach",
    mentorType: "sport",
    bio: "Helps with football progression and discipline habits.",
  },
];
