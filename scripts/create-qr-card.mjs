import QRCode from 'qrcode';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
const url='https://gabriel-garabedian.github.io/FELIZ-18-ANOS-/';
const folder='public/presente';
mkdirSync(folder,{recursive:true});
const font = (name, file, style='normal') => `@font-face{font-family:'${name}';font-style:${style};src:url(data:font/woff2;base64,${readFileSync(file).toString('base64')}) format('woff2')}`;
const fonts = font('Cormorant','node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2')
  + font('Cormorant','node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2','italic')
  + font('Manrope','node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2');
const qr=QRCode.create(url,{errorCorrectionLevel:'H'});
const modules=qr.modules;
const quiet=4;
const unit=Math.floor(588/(modules.size+quiet*2));
const size=(modules.size+quiet*2)*unit;
const x=(1080-size)/2;
const y=545;
let cells='';
for(let row=0;row<modules.size;row++)for(let col=0;col<modules.size;col++)if(modules.get(row,col))cells+=`M${x+(col+quiet)*unit},${y+(row+quiet)*unit}h${unit}v${unit}h-${unit}z`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
<defs><style>${fonts}text{fill:#f1ece2;font-family:Manrope,sans-serif}.display{font-family:Cormorant,Georgia,serif}</style></defs>
<rect width="1080" height="1440" fill="#151313"/>
<text x="78" y="90" font-size="24">para Victoria</text><text x="1002" y="90" text-anchor="end" font-size="24">com amor, Gabriel</text>
<text x="540" y="282" text-anchor="middle" class="display" font-size="148" letter-spacing="-5">Victoria,</text>
<text x="540" y="405" text-anchor="middle" class="display" font-style="italic" font-size="125" letter-spacing="-4" style="fill:#d9636d">essa é pra vc.</text>
<text x="540" y="481" text-anchor="middle" font-size="25">Feliz 18 anos, meu amor.</text>
<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="#ffffff"/>
<path d="${cells}" fill="#151313" shape-rendering="crispEdges"/>
<text x="540" y="${y+size+72}" text-anchor="middle" font-size="27">abre a câmera. eu espero.</text>
<text x="540" y="1284" text-anchor="middle" class="display" font-style="italic" font-size="47">— Gabriel</text>
<text x="540" y="1357" text-anchor="middle" font-size="22" style="fill:#c9beb5">e guarda um beijo pra depois.</text>
</svg>`;
writeFileSync(`${folder}/convite-victoria.svg`,svg);
await QRCode.toFile(`${folder}/qrcode-victoria.png`,url,{errorCorrectionLevel:'H',width:900,margin:4,color:{dark:'#151313',light:'#ffffff'}});
console.log(JSON.stringify({url,modules:modules.size,card:`${folder}/convite-victoria.svg`}));
