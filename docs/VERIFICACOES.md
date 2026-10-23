# Verificações

23/10/2026. Build TypeScript + Vite concluído, JS aproximadamente 104 KB gzip, CSS aproximadamente 4,7 KB gzip. Fotos somam cerca de 2,5 MB e são carregadas sob demanda. Sem bibliotecas de UI, analytics, vídeo ou fontes externas.

Chromium real via Playwright, build em `http://127.0.0.1:5180/`: 360, 390, 430, 768 e 1440 px. Documento com exatamente a largura da viewport e nenhum descendente fora dela. Bilhete final abre/fecha com Escape; coração revela recado; álbum expansível mostra nove fotos extras; foto principal abre inteira; reduced-motion preserva as sete frases com avanço manual. Nenhum pageerror durante esses fluxos.

Teste de áudio em desenvolvimento, com configuração e resposta WAV interceptadas só no navegador: nenhuma instância de Audio antes da interação; volume inicial 0,0035 e final 0,35 após 3,5 segundos; pausa e retomada verdadeiras; uma única frase visível na intro. Não existe WAV de teste na entrega. A música pessoal ainda não foi fornecida.

Scripts de verificação em `scripts/`: usar com Playwright CLI `run-code --filename`, após abrir a página na sessão. Screenshots em `output/playwright/`, ignorados no Git. O inspector nativo da skill de design não conseguiu iniciar o Chrome; medidas e revisão de screenshots feitas com Playwright. Não foram testados Safari/iPhone ou Android físicos, nem o áudio pessoal.

Revisão visual: as fotos reais substituem os espaços reservados; texto e legendas mantêm respiro; não há grid 3x3 no álbum principal. Movimento reduzido remove entradas espaciais; o scroll é nativo e a leitura não depende de uma animação terminar. Direção e exceções ao sorteio de composição documentadas em ART-DIRECTION.md.

Teste de produção adicional: intro automática concluiu sem clique de avanço, álbum expandido sem overflow nas cinco larguras, 19 caminhos de fotografias responderam HTTP 200 com image/jpeg e nenhum erro de console ou página. Build para GitHub Pages usa `DEPLOY_BASE=/FELIZ-18-ANOS-/`, incluindo caminhos das fotos, lightbox, áudio e fontes.
