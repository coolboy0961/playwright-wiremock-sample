import { test, expect, type Page } from "@playwright/test";
import { WrapperPage } from "../pages/wrapper-page";
import { ApiRouter } from "../../utils/api-router";
import { WireMockRestClient } from "wiremock-rest-client";
import { WireMockClientUtil } from "../../utils/wiremock-client";

test.use({
  launchOptions: {
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      // 画面録画で作った画像ファイルをffmpegでmjpegに変換したものを使う必要がある
      // ffmpeg -i qrcode.mov -vcodec mjpeg -q:v 2 -an qrcode.mjpeg
      "--use-file-for-fake-video-capture=tests/qrcode/qrcode.mjpeg",
    ],
  },
});

test.describe("Scan", () => {
  const baseUrl = "http://localhost:4200";
  let wireMock: WireMockRestClient;

  test.beforeEach(async ({ page }, testInfo) => {
    // ワーカー番号に基づいてAPIリクエストをリダイレクト
    await ApiRouter.setupApiRedirect(page, testInfo.workerIndex);
  
    // WireMockクライアントを生成
    wireMock = WireMockClientUtil.createClient(testInfo.workerIndex);
    await wireMock.mappings.resetAllMappings();
    
    const wrapperPage = new WrapperPage(page, baseUrl);
    await wrapperPage.goto();
  });

  test("QRコードスキャナーでスキャンしたテキストが表示されているか確認", async ({
    page,
  }) => {
    // Arrange

    const expectedScanedText = "https://www.google.com"

    // Act
    // 自動的にスキャンが始まるため、何もしない

    // Assert
    // 「QRコードスキャナー」のテキストが表示されているか確認
    await expect(page.getByText("QRコードスキャナー")).toBeVisible();
    const expectedCameraCountText = "利用可能なカメラデバイスの数: 1";
    await expect(page.getByText(expectedCameraCountText)).toBeVisible();
    // スキャンしたテキストが表示されているか確認
    await expect(page.getByText(expectedScanedText)).toBeVisible({ timeout: 30000 });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock1!が表示される", async ({
    page,
  }, testInfo) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping1.json')
    const expectedApiResponse = "Hello, WireMock1!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock2!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping2.json')
    const expectedApiResponse = "Hello, WireMock2!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock3!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping3.json')
    const expectedApiResponse = "Hello, WireMock3!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock4!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping4.json')
    const expectedApiResponse = "Hello, WireMock4!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock5!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping5.json')
    const expectedApiResponse = "Hello, WireMock5!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock6!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping6.json')
    const expectedApiResponse = "Hello, WireMock6!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock7!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping7.json')
    const expectedApiResponse = "Hello, WireMock7!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock8!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping8.json')
    const expectedApiResponse = "Hello, WireMock8!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock9!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping9.json')
    const expectedApiResponse = "Hello, WireMock9!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock10!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping10.json')  
    const expectedApiResponse = "Hello, WireMock10!";

    // Act
    // 自動的にスキャンが始まるため、スキャン完了まで待機
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    // APIレスポンスが表示されているか確認
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock11!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping11.json')  
    const expectedApiResponse = "Hello, WireMock11!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock12!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping12.json')  
    const expectedApiResponse = "Hello, WireMock12!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock13!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping13.json')  
    const expectedApiResponse = "Hello, WireMock13!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock14!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping14.json')  
    const expectedApiResponse = "Hello, WireMock14!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock15!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping15.json')  
    const expectedApiResponse = "Hello, WireMock15!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock16!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping16.json')  
    const expectedApiResponse = "Hello, WireMock16!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock17!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping17.json')  
    const expectedApiResponse = "Hello, WireMock17!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock18!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping18.json')  
    const expectedApiResponse = "Hello, WireMock18!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock19!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping19.json')  
    const expectedApiResponse = "Hello, WireMock19!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock20!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping20.json')  
    const expectedApiResponse = "Hello, WireMock20!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock21!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping21.json')  
    const expectedApiResponse = "Hello, WireMock21!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock22!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping22.json')  
    const expectedApiResponse = "Hello, WireMock22!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock23!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping23.json')  
    const expectedApiResponse = "Hello, WireMock23!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock24!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping24.json')  
    const expectedApiResponse = "Hello, WireMock24!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock25!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping25.json')  
    const expectedApiResponse = "Hello, WireMock25!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock26!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping26.json')  
    const expectedApiResponse = "Hello, WireMock26!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock27!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping27.json')  
    const expectedApiResponse = "Hello, WireMock27!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock28!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping28.json')  
    const expectedApiResponse = "Hello, WireMock28!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock29!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping29.json')  
    const expectedApiResponse = "Hello, WireMock29!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });

  test("QRコードスキャン後にAPIレスポンスにHello, Wiremock30!が表示される", async ({
    page,
  }) => {
    // Arrange
    await wireMock.mappings.createMappingFromFile('./tests/qrcode/mappings/sample-mapping30.json')  
    const expectedApiResponse = "Hello, WireMock30!";

    // Act
    await expect(page.getByText("https://www.google.com")).toBeVisible({ timeout: 30000 });

    // Assert
    await expect(page.locator('.api-response pre')).toBeVisible();
    await expect(page.locator('.api-response pre')).toContainText(expectedApiResponse, {
      timeout: 10000
    });
  });
});
