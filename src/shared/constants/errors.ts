export function alreadyExists(resource: string): string {
  return `${resource}-already-exist`;
}
export function notFound(resource: string): string {
  return `${resource}-not-found`;
}

export function unexpected(resource: string): string {
  return `Unexpected-error: ${resource}`;
}

export function softDeleted(resource: string): string {
  return `${resource}-soft-deleted`;
}

export function requestNotCompleted(resource: string): string {
  return `Request-not-completed-in-:${resource}`;
}
