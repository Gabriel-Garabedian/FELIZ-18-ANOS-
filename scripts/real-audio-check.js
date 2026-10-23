async (page) => {
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const base=new URL('.',page.url()).href;
  await page.addInitScript(()=>{const NativeAudio=window.Audio;window.Audio=function(...args){const track=new NativeAudio(...args);window.__audioUnderTest=track;return track;};});
  await page.goto(base);
  const noAutoplay=await page.evaluate(()=>!window.__audioUnderTest);
  await page.getByRole('button',{name:'abrir meu presente'}).click();
  await page.getByRole('button',{name:'Desligar música'}).waitFor();
  const initial=await page.evaluate(()=>({volume:window.__audioUnderTest.volume,src:window.__audioUnderTest.src,paused:window.__audioUnderTest.paused}));
  await page.waitForTimeout(3600);
  const afterFade=await page.evaluate(()=>({volume:window.__audioUnderTest.volume,time:window.__audioUnderTest.currentTime,duration:window.__audioUnderTest.duration,loop:window.__audioUnderTest.loop}));
  await page.getByRole('button',{name:'Desligar música'}).click();
  const paused=await page.evaluate(()=>window.__audioUnderTest.paused);
  await page.getByRole('button',{name:'Ligar música'}).click();
  await page.getByRole('button',{name:'Desligar música'}).waitFor();
  const resumed=await page.evaluate(()=>!window.__audioUnderTest.paused);
  return {noAutoplay,initial,afterFade,paused,resumed,errors};
}
