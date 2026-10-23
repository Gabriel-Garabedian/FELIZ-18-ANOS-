import { mkdirSync, writeFileSync } from 'node:fs';

// Original synthesized arrangement; no third-party recording or sample.
// Generate WAV, then encode with ffmpeg (see README).
const rate = 44100;
const beat = 60 / 82;
const melody = [
  ['G4', .5], ['G4', .5], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
  ['G4', .5], ['G4', .5], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
  ['G4', .5], ['G4', .5], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 1],
  ['F5', .5], ['F5', .5], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2],
];
const melodyBeats = melody.reduce((sum, note) => sum + note[1], 0);
const duration = (3 + (melodyBeats + 6) * 3) * beat + 3;
const samples = new Float32Array(Math.ceil(duration * rate));
const pitch = name => {
  const match = /^([A-G])(#?)(\d)$/.exec(name);
  const semitone = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 }[match[1]];
  return 440 * 2 ** (((Number(match[3])+1)*12 + semitone + (match[2] ? 1 : 0) - 69)/12);
};
function piano(name, start, length, amplitude, bell = false) {
  const frequency = pitch(name);
  const first = Math.floor(start * rate);
  const count = Math.min(Math.floor((length + 1.5) * rate), samples.length - first);
  for (let i = 0; i < count; i++) {
    const t = i / rate;
    const attack = 1 - Math.exp(-t * 180);
    const release = Math.exp(-Math.max(0, t - length) * 5);
    const decay = Math.exp(-t * (bell ? 1.2 : 1.65));
    const wave = Math.sin(2*Math.PI*frequency*t)
      + .34*Math.sin(2*Math.PI*frequency*2.002*t)*Math.exp(-t*2.1)
      + .13*Math.sin(2*Math.PI*frequency*3.006*t)*Math.exp(-t*3.2)
      + (bell ? .12 : .045)*Math.sin(2*Math.PI*frequency*4.01*t)*Math.exp(-t*2.5);
    samples[first+i] += wave * attack * release * decay * amplitude;
  }
}
const chords = [['C3','E3','G3'],['G2','D3','B3'],['G2','D3','G3'],['C3','E3','G3'],['C3','E3','G3'],['F2','C3','A3'],['C3','E3','G3'],['G2','D3','B3'],['C3','E3','G3']];
piano('C3', 0, 2, .11); piano('E4', .25, 2, .06); piano('G4', .5, 2, .055);
for(let repeat=0;repeat<3;repeat++) {
  const offset = 3 + repeat*(melodyBeats+6);
  let time=offset;
  melody.forEach(([name, beats], index) => {
    piano(name, time*beat, beats*beat*.9, repeat===1 ? .25 : .22, repeat===1);
    time += beats;
  });
  chords.forEach((chord, bar) => {
    const start=(offset+bar*3)*beat;
    piano(chord[0], start, 2.4*beat, .1);
    piano(chord[1], start+beat, 1.4*beat, .065);
    piano(chord[2], start+2*beat, 1.2*beat, .065);
  });
  ['C4','E4','G4','C5'].forEach((note,index)=>piano(note,(offset+melodyBeats+index*.6)*beat,1.8,.055));
}
// Gentle room echoes, mixed separately to avoid feedback or a harsh loop boundary.
const dry = samples.slice();
for(const [delay,gain] of [[.09,.09],[.21,.065],[.37,.045]]){
  const shift=Math.round(delay*rate);
  for(let i=shift;i<samples.length;i++)samples[i]+=dry[i-shift]*gain;
}
let peak=0;
for(const value of samples) peak=Math.max(peak,Math.abs(value));
const pcm = Buffer.alloc(samples.length*2);
for(let i=0;i<samples.length;i++){
  const fade=Math.min(1,i/(rate*.08),(samples.length-i)/(rate*2.5));
  pcm.writeInt16LE(Math.round(samples[i]/peak*.78*fade*32767),i*2);
}
const header=Buffer.alloc(44);
header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);
header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(1,22);
header.writeUInt32LE(rate,24);header.writeUInt32LE(rate*2,28);header.writeUInt16LE(2,32);header.writeUInt16LE(16,34);
header.write('data',36);header.writeUInt32LE(pcm.length,40);
mkdirSync('output/audio',{recursive:true});
writeFileSync('output/audio/parabens-instrumental.wav',Buffer.concat([header,pcm]));
console.log(JSON.stringify({durationSeconds:samples.length/rate,peakBeforeNormalization:peak,output:'output/audio/parabens-instrumental.wav'}));
