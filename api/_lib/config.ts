export const OWNER_NAME = "Thiago Morato";

export const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const MODEL = process.env.OPENROUTER_MODEL?.trim();

export const API_KEY = process.env.OPENROUTER_API_KEY?.trim() ?? "";
export const SITE_URL = process.env.OPENROUTER_SITE_URL?.trim() ?? "";
export const SITE_NAME = process.env.OPENROUTER_SITE_NAME?.trim() || `${OWNER_NAME} — Portfolio`;

export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN?.trim() ?? "";

export const NO_MATCH = "NO_MATCH";

export const MAX_QUESTION_LENGTH = 500;

export const MIN_SCORE = 2;
export const TOP_K = 4;
export const MAX_CONTEXT_CHUNKS = 6;

export const TEMPERATURE = 0.3;
export const MAX_TOKENS = 500;
