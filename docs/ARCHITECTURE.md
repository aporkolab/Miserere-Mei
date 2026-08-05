# Architektúra — v1.7.0

## Futási modell

```text
Böngésző
   │ HTTPS / HttpOnly session cookie
   ▼
Express 5 :8080
   ├── Angular 22 statikus alkalmazás és SPA fallback
   ├── REST API, RBAC, validáció és rate limit
   ├── /health, /ready, /metrics
   └── Sequelize 6
          ├── SQLite /data/miserere.sqlite (alapértelmezett)
          └── MySQL 8 (külső, skálázott telepítés)
```

Az egy-image-es mód azonnal indítható és egy példányhoz ideális. Több replika
esetén külső MySQL, megosztott rate-limit tároló és külső session/BFF stratégia
szükséges; SQLite volume nem osztható biztonságosan több író között.

## Frontend

Az Angular kliens moduláris oldal-, komponens-, modell- és service-rétegekből
áll. A production API URL azonos origin (`''`), ezért nincs környezetspecifikus
API-host a bundle-ben. A globális interceptor `withCredentials` módban küldi a
cookie-t. A kliens nem fér hozzá tokenhez és nem tárol hitelesítési adatot Web
Storage-ban.

## Backend

Az Express middleware sorrendje: biztonsági fejlécek, CORS, naplózás, JSON
limit, cookie-feldolgozás, metrika, CSRF-origin ellenőrzés, útvonalak, statikus
frontend, 404 és központi hibakezelés. Az admin útvonalak hitelesítés és
role-ellenőrzés mögött vannak. Az általános CRUD service mező-allowlistet és
biztonságos azonosító-ellenőrzést használ.

## Adatok és migráció

Az Umzug induláskor csak a még nem alkalmazott, sorrendezett migrációkat
futtatja, állapotukat a `SequelizeMeta` táblában tartja. A seed csak üres Place
táblán dolgozik, ezért újraindításkor nem duplikál. Sémafrissítéshez új,
visszafelé kompatibilis migrációs fájlt kell hozzáadni; meglévő migrációt kiadás
után tilos átírni.

## Hitelesítés

Sikeres login után egyórás HS256 JWT kerül `HttpOnly`, productionben `Secure`,
`SameSite=Strict` cookie-ba. A token issuer- és audience-ellenőrzött. A módosító
cookie-kéréseknél az Origin csak az allowlistből jöhet. Logout törli a cookie-t;
a session végpont visszaállítja a kliensállapotot oldalfrissítés után.

## Megfigyelhetőség

A logger strukturált adatot ír stdoutba. A Prometheus kliens process-, runtime-
és HTTP-latency metrikákat közöl. `SENTRY_DSN` esetén a központi hibakezelő
továbbítja az 5xx kivételeket. A health és readiness külön végpont, így az
orchestrator nem irányít forgalmat hibás adatbázisú példányra.

## Minőségkapuk

Jest és Karma/Jasmine adja a unit teszteket; Playwright Chromium desktop és
mobil profilon E2E-t és képi baseline-t futtat; Axe WCAG 2 A/AA/2.1 AA hibákra
bukik. A CI auditálja mindhárom lockfile-t és külön felépíti a production
containert.
