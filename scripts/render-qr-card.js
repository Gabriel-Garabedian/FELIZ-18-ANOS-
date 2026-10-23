async (page) => {
  await page.setViewportSize({width:1080,height:1440});
  await page.goto('http://127.0.0.1:5178/presente/convite-victoria.svg');
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('svg').screenshot({path:'public/presente/convite-victoria.png'});
  return {image:'public/presente/convite-victoria.png'};
}
