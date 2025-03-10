export const PORT_MAPPINGS = {
  0: '8080',
  1: '8081',
  2: '8082'
} as const;

export type ParallelIndex = keyof typeof PORT_MAPPINGS; 