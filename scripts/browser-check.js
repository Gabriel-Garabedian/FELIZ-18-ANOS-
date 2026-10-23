async (page) => {
  const baseURL = new URL('.', page.url()).href;
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  if (await page.getByRole('button', {name:'abrir meu presente'}).isVisible()) {
    await page.getByRole('button', {name:'abrir meu presente'}).click();
    if (await page.getByRole('button',{name:'continuar →'}).isVisible()) {
      for(let i=0;i<7;i++) await page.getByRole('button',{name:'continuar →'}).click();
    } else await page.getByRole('button',{name:'ir para a carta →'}).click();
  }
  await page.getByRole('heading', { name: /Victoria essa é/ }).waitFor();
  const widths = [];
  for (const width of [360, 390, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: width > 768 ? 1000 : 844 });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.cover-photo img').waitFor();
    await page.locator('.cover-photo img').evaluate(img => img.decode());
    await page.evaluate(() => window.scrollTo({top: 0, behavior:'instant'}));
    await page.screenshot({path: `output/playwright/cover-${width}.png`});
    const sizes = await page.evaluate(() => ({viewport:innerWidth, document:document.documentElement.scrollWidth, overflowing:[...document.querySelectorAll('main *')].filter(el => {const r=el.getBoundingClientRect();return r.width>0 && (r.right>innerWidth+1 || r.left < -1)}).map(el=>({tag:el.tagName,cls:el.className,text:el.textContent?.slice(0,55)})).slice(0,15)}));
    widths.push({width,...sizes});
  }
  await page.setViewportSize({width:390,height:844});
  await page.locator('.album').evaluate(el => el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.locator('.album img').first().evaluate(img => img.decode());
  await page.screenshot({path:'output/playwright/album-390.png'});
  await page.locator('.letter').evaluate(el => el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:'output/playwright/letter-390.png'});
  await page.getByRole('button',{name:'tem mais uma coisa...'}).click();
  const dialogOpened = await page.getByRole('dialog').isVisible();
  await page.screenshot({path:'output/playwright/extra-letter-390.png'});
  await page.keyboard.press('Escape');
  const dialogClosed = !(await page.getByRole('dialog').isVisible());
  await page.getByRole('button',{name:'Um coração com um segredo'}).click();
  const secret = await page.getByText('eu te amo, minha cetinha ❤️').isVisible();
  await page.locator('.more-memories summary').click();
  const extraPhotoCount = await page.locator('.extra-photos img').count();
  await page.getByRole('button',{name:'Ver foto inteira: eu amo essa foto.'}).click();
  const photoOpened = await page.getByRole('dialog',{name:'Fotografia completa'}).isVisible();
  await page.keyboard.press('Escape');
  await page.emulateMedia({reducedMotion:'reduce'});
  const reducedMotion = await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  await page.goto(baseURL);
  await page.getByRole('button',{name:'abrir meu presente'}).click();
  const manual = [];
  for(let i=0;i<7;i++){manual.push(await page.locator('.intro-manual').textContent());await page.getByRole('button',{name:'continuar →'}).click();}
  await page.getByRole('heading',{name:/Victoria essa é/}).waitFor();
  return {widths,dialogOpened,dialogClosed,secret,extraPhotoCount,photoOpened,reducedMotion,manual,errors};
}
