# tiktok-motion

Krótkie motion grafiki 9:16 (1080×1920) na TikToka, robione w HTML/JS.

## Scam reklamy na Facebooku (25 s)

Gotowe wideo: [`out/scam-reklamy.mp4`](out/scam-reklamy.mp4) (bez dźwięku, muzykę dodaj w TikToku).

| Scena | Treść | Źródło |
|---|---|---|
| 1 | Hook: „Ile Facebook zarabia na oszustwach?” + fałszywa reklama ze stemplem SCAM | — |
| 2 | **$16 mld** (≈10% przychodu Meta) z reklam oszustw i zakazanych produktów, prognoza na 2024 r. | Wewnętrzne dokumenty Meta, Reuters (XI 2025) |
| 3 | **15 mld** reklam scamowych „wysokiego ryzyka” wyświetlanych dziennie | Dokument Meta z XII 2024, Reuters |
| 4 | Polska: Meta mogła zarobić **do 760 mln zł** rocznie na oszukańczych reklamach — ponad 1/3 jej przychodów w PL | Fundacja Instrat (2026), szacunek |
| 5 | Polacy w 2025 r. stracili **750+ mln zł** na oszustwach w sieci (≈2 mln zł dziennie) | NBP, dane za 2025 r. |
| 6 | CTA: Nie klikaj · Zgłaszaj · Ostrzeż bliskich + źródła | — |

Uwaga: Meta kwestionuje zarówno liczby z dokumentów ujawnionych przez Reutersa, jak i raport Instratu.

## Podgląd i render

- Podgląd w przeglądarce: otwórz `index.html` (animacja się zapętla).
- Render do MP4 (wymaga Node, Playwright i ffmpeg):

  ```sh
  node render.mjs            # -> out/scam-reklamy.mp4
  node render.mjs --stills   # -> out/still-*.png (podgląd klatek)
  ```

Teksty, liczby i czasy scen są w `index.html` (obiekt `S` i funkcja `render(t)`).
