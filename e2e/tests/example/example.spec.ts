import { test, expect } from '@playwright/test';
import { WireMockRestClient } from 'wiremock-rest-client';
import axios from 'axios';

test('wiremock test', async () => {
  // Arrange
  const wireMock = new WireMockRestClient('http://localhost:8091');
  // await wireMock.mappings.createMappingsFromDir('./tests/example/mappings');
  await wireMock.mappings.createMappingFromFile('./tests/example/mappings/sample-mapping.json')

  // Act
  const response = await axios.get('http://localhost:8091/api/example');

  // Assert
  expect(response.status).toBe(200);
  expect(response.data).toEqual({
    message: "Hello, WireMock! From playwright!",
    status: "success",
    data: {
      id: 123,
      name: "Sample Data"
    }
  });

  await wireMock.mappings.resetAllMappings();
})

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
