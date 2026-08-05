# Miserere Mei v1.7.0

Modern, reszponzív, magyar nyelvű posztapokaliptikus kalandjáték Angular 22 és
Express 5 alapon. A v1.7 egyetlen production konténerben egyesíti a webes
felületet, az API-t és az alapértelmezett SQLite-adattárat.

## Azonnali indítás

Előfeltétel: Docker 24+ Compose pluginnal.

```bash
JWT_SECRET="$(openssl rand -hex 32)" docker compose up --build
```

Nyisd meg: <http://localhost:8080>. A `miserere_data` volume megtartja az
adatokat frissítés és újraindítás után is.

Admin felülethez az első indítás előtt adj meg egyedi `ADMIN_EMAIL` és
`ADMIN_PASSWORD` értéket a `.env` fájlban. Beépített production admin-jelszó
nincs.

Közvetlenül, Compose nélkül:

```bash
docker build -t miserere-mei:1.7.0 .
docker run --rm -p 8080:8080 -v miserere-data:/data \
  -e JWT_SECRET="$(openssl rand -hex 32)" \
  -e CORS_ORIGIN=http://localhost:8080 miserere-mei:1.7.0
```

## Funkciók

- elágazó történet, helyszínek, döntések és térkép;
- körökre osztott harc, életerő, lőszer és készlet;
- felhasználói bejelentkezés és szerepkörös adminisztráció;
- helyszín-, játékos- és felhasználó-kezelés;
- high-tech, mobilbarát kezelőfelület;
- HttpOnly, Secure, SameSite session cookie és origin-alapú CSRF-védelem;
- rate limit, Helmet, CORS, bemenetkorlátok és szerveroldali
  jogosultságvizsgálat;
- verziózott adatbázis-migráció és idempotens első seed;
- Prometheus metrikák és opcionális Sentry hibakövetés;
- unit-, E2E-, WCAG- és vizuális regressziós tesztek;
- többarchitektúrás, SBOM-mal és provenance-szel kiadható Docker image.

## Fejlesztés

Node.js 24 és npm 10+ szükséges.

```bash
npm ci
npm ci --prefix backend
npm ci --prefix frontend
npm start
```

A fejlesztői frontend a `4200`, az API a `3000` portot használja. A lokális
backendhez MySQL vagy `DB_DIALECT=sqlite` választható.

```bash
npm run lint
npm test
npm run build
npm run e2e
npm run security:audit
```

## Konfiguráció

| Változó                                                   | Jelentés                                  | Alapérték a konténerben                        |
| --------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| `JWT_SECRET`                                              | legalább 32 karakteres aláíró kulcs       | nincs biztonságos alapérték                    |
| `CORS_ORIGIN`                                             | engedélyezett origin, vesszővel bővíthető | `http://localhost:8080`                        |
| `DB_DIALECT`                                              | `sqlite` vagy `mysql`                     | `sqlite`                                       |
| `DB_STORAGE`                                              | SQLite fájl                               | `/data/miserere.sqlite`                        |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | külső MySQL kapcsolat                     | nincs                                          |
| `SEED_DATABASE`                                           | üres adatbázis kezdeti feltöltése         | `true`                                         |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`                           | első admin létrehozása üres adatbázisban  | nincs                                          |
| `SENTRY_DSN`                                              | opcionális hibakövetés                    | kikapcsolva                                    |
| `COOKIE_SECURE`                                           | HTTPS cookie kényszerítése                | lokálisan `false`, productionben legyen `true` |
| `TRUST_PROXY`                                             | egy megbízható reverse proxy kezelése     | `false`                                        |

Nyilvános telepítéskor ne használd a Compose fejlesztői `JWT_SECRET`
alapértékét.

## Üzemeltetés

- `GET /health`: alkalmazás- és adatbázis-állapot;
- `GET /ready`: orchestrator readiness probe;
- `GET /metrics`: Prometheus-formátumú Node és HTTP metrikák;
- strukturált JSON napló stdouton;
- SIGTERM/SIGINT esetén szabályos HTTP- és adatbázis-leállás.

Mentés és visszaállítás előtt állítsd le az író példányt:

```bash
npm run backup
npm run restore -- backups/miserere-YYYYMMDDTHHMMSSZ.sqlite
```

A mentés SHA-256 ellenőrzőösszeget kap, a visszaállítás pedig SQLite
integritásvizsgálatot futtat. A részletes runbook a
[telepítési dokumentációban](docs/DEPLOYMENT.md) található.

## CI/CD

A CI minden push és PR esetén lintet, backend/frontend unit tesztet, production
buildet, függőségi auditot, Playwright E2E-t, Axe WCAG-vizsgálatot, képi
regressziót és Docker buildet futtat. A kézi Deploy workflow `staging` vagy
jóváhagyással `production` környezetbe küld immutable digestet, smoke testet
végez, hibánál rollback webhookot hív.

## Dokumentáció

- [Architektúra](docs/ARCHITECTURE.md)
- [Telepítés és runbook](docs/DEPLOYMENT.md)
- [OpenTofu/Terraform IaC](infra/README.md)
- [Biztonsági szabályzat](SECURITY.md)
- [Közreműködés](CONTRIBUTING.md)
- [Változásnapló](CHANGELOG.md)

## Licenc

A projekt licence: CC-BY-NC-ND-4.0. A forrás metaadataiban ez az irányadó.
