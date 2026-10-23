import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';
const expected='https://gabriel-garabedian.github.io/FELIZ-18-ANOS-/';
for(const file of ['public/presente/qrcode-victoria.png','public/presente/convite-victoria.png']){
  const png=PNG.sync.read(readFileSync(file));
  const decoded=jsQR(new Uint8ClampedArray(png.data),png.width,png.height);
  if(decoded?.data!==expected)throw new Error(`QR não validado: ${file}`);
  console.log(JSON.stringify({file,width:png.width,height:png.height,decoded:decoded.data,valid:true}));
  if(file.includes('convite')){
    const width=360,height=Math.round(png.height*width/png.width);
    const pixels=new Uint8ClampedArray(width*height*4);
    for(let y=0;y<height;y++)for(let x=0;x<width;x++){
      const source=(Math.floor(y*png.height/height)*png.width+Math.floor(x*png.width/width))*4;
      pixels.set(png.data.subarray(source,source+4),(y*width+x)*4);
    }
    const mobile=jsQR(pixels,width,height);
    if(mobile?.data!==expected)throw new Error('QR não validado na imagem reduzida a 360px');
    console.log(JSON.stringify({mobileWidth:width,decoded:mobile.data,valid:true}));
  }
}
