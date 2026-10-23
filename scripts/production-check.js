async (page) => {
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  const baseURL=new URL('.',page.url()).href;
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:390,height:844});
  await page.goto(baseURL);
  await page.getByRole('button',{name:'abrir meu presente'}).waitFor();
  await page.waitForTimeout(3500);
  await page.screenshot({path:'output/playwright/presente-390.png'});
  await page.getByRole('button',{name:'abrir meu presente'}).click();
  await page.getByRole('heading',{name:/Victoria essa é/}).waitFor({timeout:35000});
  await page.locator('.more-memories summary').click();
  const expanded=[];
  for(const width of [360,390,430,768,1440]){
    await page.setViewportSize({width,height:844});
    expanded.push(await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth})));
  }
  const photos=await page.locator('main img').evaluateAll(images=>[...new Set(images.map(img=>img.getAttribute('src')))]);
  const photoResponses=[];
  for(const path of photos){const response=await page.request.get(new URL(path,baseURL).href);photoResponses.push({path,status:response.status(),type:response.headers()['content-type']});}
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('.album').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForTimeout(1300);
  await page.screenshot({path:'output/playwright/album-1440.png'});
  await page.locator('.final').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForTimeout(1300);
  await page.screenshot({path:'output/playwright/final-1440.png'});
  return {automaticIntroCompleted:true,expanded,photoResponses,errors};
}
