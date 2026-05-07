import { expect, test, type Page } from '@playwright/test';

async function waitForReady(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

async function getFirstProjectDetailPath(page: Page) {
  await page.goto('/projects/', { waitUntil: 'networkidle' });
  await waitForReady(page);

  const firstProjectLink = page.getByTestId('project-card-link').first();
  await expect(firstProjectLink).toBeVisible();

  const href = await firstProjectLink.getAttribute('href');
  if (!href) {
    throw new Error('未找到项目详情链接，无法执行详情页视觉测试。');
  }

  return href.startsWith('/') ? href : `/${href}`;
}

test('home full-page visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await waitForReady(page);
  await expect(page).toHaveScreenshot('home-full-page.png', { fullPage: true });
});

test('projects full-page visual baseline', async ({ page }) => {
  await page.goto('/projects/', { waitUntil: 'networkidle' });
  await waitForReady(page);
  await expect(page).toHaveScreenshot('projects-full-page.png', { fullPage: true });
});

test('project-detail full-page visual baseline (dynamic)', async ({ page }) => {
  const detailPath = await getFirstProjectDetailPath(page);
  await page.goto(detailPath, { waitUntil: 'networkidle' });
  await waitForReady(page);
  await expect(page).toHaveScreenshot('project-detail-full-page.png', { fullPage: true });
});

test('home hero section visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await waitForReady(page);

  const heroSection = page.getByTestId('home-hero-section');
  await expect(heroSection).toBeVisible();
  await expect(heroSection).toHaveScreenshot('home-hero-section.png');
});

test('home bento section visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await waitForReady(page);

  const bentoSection = page.getByTestId('home-bento-section');
  await expect(bentoSection).toBeVisible();
  await expect(bentoSection).toHaveScreenshot('home-bento-section.png');
});
