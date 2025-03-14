export const PORT_MAPPINGS = {
  0: '8080',
  1: '8081',
  2: '8082'
} as const;

export type ParallelIndex = keyof typeof PORT_MAPPINGS;

/**
 * パラレル実行のインデックスに対応するポート番号を取得
 * @param parallelIndex パラレル実行のインデックス（1から開始）
 * @returns ポート番号
 */
export function getPortForParallel(parallelIndex: number): string {
  const port = PORT_MAPPINGS[parallelIndex as ParallelIndex];
  if (!port) {
    throw new Error(`Invalid parallel index: ${parallelIndex}. Valid indices are: ${Object.keys(PORT_MAPPINGS).join(', ')}`);
  }
  return port;
} 