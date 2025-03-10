import { WireMockRestClient } from 'wiremock-rest-client';
import { PORT_MAPPINGS, ParallelIndex } from './port-mappings';

export class WireMockClientUtil {
  /**
   * パラレル実行のインデックスに基づいてWireMockクライアントを生成
   * @param parallelIndex パラレル実行のインデックス（1から開始）
   * @returns WireMockRestClientのインスタンス
   */
  static createClient(parallelIndex: number): WireMockRestClient {
    const port = this.getPortForParallel(parallelIndex);
    return new WireMockRestClient(`http://localhost:${port}`);
  }

  /**
   * パラレル実行のインデックスに対応するポート番号を取得
   * @param parallelIndex パラレル実行のインデックス（1から開始）
   * @returns ポート番号
   */
  private static getPortForParallel(parallelIndex: number): string {
    const port = PORT_MAPPINGS[parallelIndex as ParallelIndex];
    if (!port) {
      throw new Error(`Invalid parallel index: ${parallelIndex}. Valid indices are: ${Object.keys(PORT_MAPPINGS).join(', ')}`);
    }
    return port;
  }
} 