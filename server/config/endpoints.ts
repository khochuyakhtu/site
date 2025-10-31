import { fetchJson, fetchJsonFromAny } from '../http.ts';

const cache = new Map<string, string[]>();

function parseEndpoints(rawValue: string, envVar: string): string[] {
  const endpoints = rawValue
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  if (endpoints.length === 0) {
    throw new Error(`Environment variable ${envVar} does not contain valid endpoints`);
  }

  return endpoints;
}

export function getRequiredEndpoints(envVar: string): string[] {
  if (cache.has(envVar)) {
    return cache.get(envVar)!;
  }

  const rawValue = process.env[envVar];
  if (!rawValue) {
    throw new Error(`Environment variable ${envVar} is not set`);
  }

  const endpoints = parseEndpoints(rawValue, envVar);
  cache.set(envVar, endpoints);
  return endpoints;
}

export async function fetchFromConfiguredEndpoints(
  envVar: string,
  options: RequestInit = {}
): Promise<unknown> {
  const endpoints = getRequiredEndpoints(envVar);
  if (endpoints.length === 1) {
    return fetchJson(endpoints[0], options);
  }

  return fetchJsonFromAny(endpoints, options);
}
