# Közreműködés

## Környezet

Node.js 24, npm 10+, Git és az E2E-hez Playwright Chromium szükséges.

```bash
npm ci
npm ci --prefix backend
npm ci --prefix frontend
npx --prefix frontend playwright install chromium
```

## Kötelező ellenőrzés

```bash
npm run lint
npm test
npm run build
npm run e2e
npm run security:audit
docker build -t miserere-mei:test .
```

Új viselkedéshez teszt, UI-változáshoz ellenőrzött Playwright baseline,
séma-változáshoz új előre haladó migráció, konfiguráció-változáshoz README és
runbook frissítés kell. Kiadás után meglévő migrációt ne módosíts.

## Git és review

A `main` mindig kiadható. Rövid életű branchet és Conventional Commit formátumot
használj. A PR legyen kis hatókörű, írja le az okot, megoldást, kompatibilitási
vagy adatvesztési kockázatot és az elvégzett ellenőrzést. Titkot, `.env` fájlt,
adatbázist, mentést, tesztreportot vagy `node_modules` könyvtárat ne commitolj.

## Kódstílus

- TypeScript/JavaScript: Prettier és ESLint szerinti forma.
- API: bemenetet szerveroldalon validálni, mezőt allowlistelni, admin műveletet
  RBAC mögé tenni.
- Frontend: token nem kerülhet Web Storage-ba vagy JavaScriptből olvasható
  cookie-ba.
- Hiba: külső válaszban ne legyen stack vagy belső részlet; belül strukturált
  napló és Sentry context legyen.
- Akadálymentesség: billentyűzet, látható fókusz, szemantikus HTML, WCAG AA
  kontraszt.

Biztonsági problémát a [biztonsági szabályzat](SECURITY.md) szerint, privát
csatornán jelents.
