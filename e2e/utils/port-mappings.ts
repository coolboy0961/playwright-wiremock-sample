export const PORT_MAPPINGS = {
  1: '8080',
  2: '8081',
  3: '8082'
} as const;

export type WorkerIndex = keyof typeof PORT_MAPPINGS; 