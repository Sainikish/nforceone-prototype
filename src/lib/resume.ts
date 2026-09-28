/**
 * Resume upload rules, shared by the Careers form (client) and /api/contact (server).
 * 4 MB keeps the whole request under Vercel's ~4.5 MB serverless body limit.
 */
export const RESUME_MAX_BYTES = 4 * 1024 * 1024;
export const RESUME_ACCEPT = ".pdf,.doc,.docx";
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const EXT = /\.(pdf|docx?)$/i;

/** Client-side check (type + size). Returns an error message or null. */
export function checkResume(file: { name: string; size: number }): string | null {
  if (!EXT.test(file.name)) return "Please upload a PDF or Word document (.pdf, .doc, .docx).";
  if (file.size === 0) return "That file looks empty. Please choose another.";
  if (file.size > RESUME_MAX_BYTES) return "Please keep your resume under 4 MB.";
  return null;
}

/**
 * Server-side check of the file's real contents (magic bytes), so a renamed file can't pass as a
 * resume: PDF starts with %PDF, .docx is a ZIP container (PK..), legacy .doc is an OLE compound file.
 */
export function sniffResume(bytes: Uint8Array): "pdf" | "docx" | "doc" | null {
  const b = (i: number) => bytes[i];
  if (b(0) === 0x25 && b(1) === 0x50 && b(2) === 0x44 && b(3) === 0x46) return "pdf";
  if (b(0) === 0x50 && b(1) === 0x4b && b(2) === 0x03 && b(3) === 0x04) return "docx";
  if (b(0) === 0xd0 && b(1) === 0xcf && b(2) === 0x11 && b(3) === 0xe0) return "doc";
  return null;
}
