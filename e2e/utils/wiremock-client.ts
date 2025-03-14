import { WireMockRestClient } from 'wiremock-rest-client';
import { getPortForParallel } from './port-mappings';

export class WireMockClientUtil {
  /**
   * パラレル実行のインデックスに基づいてWireMockクライアントを生成
   * @param parallelIndex パラレル実行のインデックス（1から開始）
   * @returns WireMockRestClientのインスタンス
   */
  static createClient(parallelIndex: number): WireMockRestClient {
    const port = getPortForParallel(parallelIndex);
    return new WireMockRestClient(`http://localhost:${port}`);
  }
} 