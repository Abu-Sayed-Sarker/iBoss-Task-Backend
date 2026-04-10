import { info } from "./info.js";
import { tags } from "./tags.js";
import { components } from "./components.js";
import { paths } from "./paths.js";
import env from "../../env.js";

const normalizeBaseUrl = (value) => {
  if (!value) return "/";
  const trimmed = String(value).trim();
  if (!trimmed) return "/";
  if (trimmed === "/") return "/";
  if (trimmed.startsWith("/")) {
    const normalized = trimmed.replace(/\/+$/, "");
    return normalized || "/";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/+$/, "");
  }
  return `http://${trimmed.replace(/\/+$/, "")}`;
};

const defaultBaseUrl = env.API_BASE_URL || "/";

export const buildOpenApiSpec = ({ baseUrl } = {}) => ({
  openapi: "3.0.0",
  info,
  servers: [{ url: normalizeBaseUrl(baseUrl || defaultBaseUrl) }],
  tags,
  components,
  paths,
});

const openapiSpec = buildOpenApiSpec();
export default openapiSpec;
