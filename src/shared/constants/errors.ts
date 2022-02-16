export function alreadyExists(resource: string): string {
  return `${resource}-already-exist`;
}
export function notFound(resource: string): string {
  return `${resource}-not-found`;
}

export function unexpected(resource: string): string {
  return `Unexpected-error: ${resource}`;
}
