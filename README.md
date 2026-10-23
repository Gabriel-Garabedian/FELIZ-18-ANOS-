# Para Victoria, com amor

Presente de 18 anos de Gabriel para Victoria. React + TypeScript + Vite, CSS e GSAP apenas para a sequência de abertura e entradas pontuais. Sem backend, rastreadores ou bibliotecas de UI.

## Rodar

Requer Node 22.12+ e npm.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Personalizar antes de entregar

- `src/config.ts`: nomes, idade, apelidos, datas e configuração da música.
- `src/data/messages.ts`: introdução, carta nova, lista de coisas amadas, final e bilhete extra.
- `src/data/memories.ts`: fotos, legendas e cinco marcos reais. Timeline ativada: se conheceram em 01/01/2024 e começaram a namorar em 20/09/2025, conforme Gabriel confirmou. RioMar, Natal de 2025 e viagem em 14/02/2026 vêm do site anterior.
- `public/photos/foto-01.jpg`: retrato de Victoria na capa (vertical).
- `public/photos/memoria-01.jpg` a `memoria-14.jpg`: álbum principal e álbum expansível. Toque para ver o enquadramento completo.
- `public/photos/foto-final.jpg`: a foto mais especial (vertical).
- `public/photos/historia-01.jpg` a `historia-03.jpg`: fotos do site anterior associadas ao RioMar, Natal e viagem, respectivamente.
- `public/audio/musica.mp3`: música fornecida por você, autorizada. Depois defina `musicAvailable: true`.

Fotos reais incluídas: 16 imagens distintas do ZIP e três do repositório anterior, cerca de 2,5 MB. Uma duplicata da praia foi omitida. Barras pretas de captura de tela foram removidas das duas cópias da praia, preservando a área fotográfica. Originais permanecem intactos no ZIP e no repositório de referência. Se remover uma foto, aparece uma página de álbum “um espaço guardado pra nós”, sem requisição quebrada. Após adicionar imagens, reinicie o servidor e reconstrua a versão de produção. As duas famílias de fontes são servidas localmente.

O áudio inicia diretamente no clique inicial, sobe de zero até 35% em 3,2s e pode ser pausado/retomado. Caso o arquivo falhe ou não esteja configurado, a história continua com indicação discreta. Alguns navegadores móveis administram o volume pelo sistema: confirme o nível no aparelho final.

## Navegação e acessibilidade

A intro avança automaticamente em aproximadamente 27 segundos e pode ser pulada. Com `prefers-reduced-motion`, vira uma sequência manual sem deslocamentos, mantendo todas as frases. Mudanças na preferência durante a visita também são respeitadas. O scroll permanece nativo. A carta é legível sem depender de revelações por animação. O bilhete final usa diálogo nativo (foco, Escape e retorno ao botão). O coração quase escondido revela um recado no próprio fluxo.

## Entrega

Build estático em `dist/`, publicável em hospedagens estáticas. O cadastro Sites começa privado: se quiser um link para Victoria abrir fora da sua conta, será necessário configurar o acesso apropriado. Confira as fotos, a música e os textos antes de compartilhar.

## GitHub Pages

Repositório de entrega: https://github.com/Gabriel-Garabedian/FELIZ-18-ANOS-

O workflow `.github/workflows/deploy.yml` publica a branch `main` no Pages. A configuração do repositório deve usar **Settings → Pages → Source → GitHub Actions**. O build do workflow define `DEPLOY_BASE=/FELIZ-18-ANOS-/`, respeitado pelas fotos, fontes e áudio. Localmente a base padrão é `/`. Para hospedar em outro caminho, ajuste a variável no workflow. O link só estará ativo quando o workflow terminar.
