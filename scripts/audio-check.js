async (page) => {
  // A synthetic quiet WAV is served only inside this browser check. No audio asset is shipped.
  const rate = 8000;
  const wav = Buffer.alloc(44 + rate * 2);
  wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);
  wav.writeUInt32LE(rate,24);wav.writeUInt32LE(rate*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);
  wav.write('data',36);wav.writeUInt32LE(rate*2,40);
  for(let i=0;i<rate;i++)wav.writeInt16LE(Math.round(Math.sin(i/rate*440*2*Math.PI)*150),44+i*2);
  await page.route('**/src/config.ts*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('musicAvailable: false','musicAvailable: true')});});
  await page.route('**/audio/musica.mp3',route=>route.fulfill({status:200,contentType:'audio/wav',body:wav}));
  await page.addInitScript(()=>{const NativeAudio=window.Audio;window.Audio=function(...args){const track=new NativeAudio(...args);window.__audioUnderTest=track;return track;};});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:5178/');
  const beforeClick=await page.evaluate(()=>Boolean(window.__audioUnderTest));
  await page.getByRole('button',{name:'abrir meu presente'}).click();
  await page.getByRole('button',{name:'Desligar música'}).waitFor();
  const earlyVolume=await page.evaluate(()=>window.__audioUnderTest.volume);
  await page.waitForTimeout(3500);
  const finalVolume=await page.evaluate(()=>window.__audioUnderTest.volume);
  await page.getByRole('button',{name:'Desligar música'}).click();
  const paused=await page.evaluate(()=>window.__audioUnderTest.paused);
  await page.getByRole('button',{name:'Ligar música'}).click();
  await page.getByRole('button',{name:'Desligar música'}).waitFor();
  const resumed=await page.evaluate(()=>!window.__audioUnderTest.paused);
  const maximumVisibleIntroLines=await page.locator('.intro-line').evaluateAll(lines=>lines.filter(line=>getComputedStyle(line).visibility==='visible').length);
  await page.getByRole('button',{name:'ir para a carta →'}).click();
  await page.getByRole('heading',{name:/Victoria essa é/}).waitFor();
  await page.unrouteAll();
  return {audioCreatedBeforeClick:beforeClick,earlyVolume,finalVolume,paused,resumed,maximumVisibleIntroLines};
}
