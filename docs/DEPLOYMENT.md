# Telepítési és üzemeltetési runbook — v1.7.0

## Egygépes telepítés

1. Másold a `.env.example` fájlt `.env` néven.
2. Generálj titkot: `openssl rand -hex 32`.
3. Adj meg egyedi `ADMIN_EMAIL` és erős `ADMIN_PASSWORD` értéket az első
   indításhoz.
4. A kapcsolatfelvételhez a secret managerben állítsd be a `CONTACT_EMAIL` és
   `SMTP_*` értékeket.
5. Állítsd a nyilvános HTTPS origint a `CORS_ORIGIN` mezőbe.
6. Nyilvános HTTPS esetén állítsd a `COOKIE_SECURE=true` értéket.
7. Indítsd: `docker compose up -d --build`.
8. Ellenőrizd: `curl --fail http://localhost:8080/ready`.

A TLS-t egy reverse proxy vagy load balancer zárja le. Proxy mögött
`TRUST_PROXY=true` szükséges. A `/data` volume nélkül az adatbázis a konténer
törlésekor elvész.

## Staging és production

A GitHub `staging` és `production` Environmentben állítható jóváhagyás, titok és
branch policy. Szükséges titkok:

- `DEPLOY_WEBHOOK`: a platform immutable digest deploy végpontja;
- `DEPLOY_TOKEN`: rövid jogosultságú deploy token;
- `DEPLOY_URL`: a cél publikus alap URL-je;
- `ROLLBACK_WEBHOOK`: az előző egészséges digest visszaállítása;
- opcionálisan alkalmazásoldalon `SENTRY_DSN`.

A Deploy workflow multi-arch image-et, SBOM-ot és provenance attestációt
publikál a GHCR-be. Előbb stagingre telepíts, futtasd a smoke/E2E ellenőrzést,
majd productionre. A production Environmenthez kötelező reviewer javasolt.

## Frissítés és rollback

Frissítés előtt készíts mentést. Az új image induláskor előre futtatja a
migrációkat. A sémafrissítés legyen expand/contract jellegű: előbb kompatibilis
oszlop hozzáadás, később kódváltás, csak külön kiadásban eltávolítás. Sikertelen
readiness esetén a workflow rollback webhookja az előző digestet aktiválja.

## Mentés

Host oldali SQLite esetén:

```bash
MISERERE_DATA_DIR=./data MISERERE_BACKUP_DIR=./backups npm run backup
```

Automatizáld naponta, titkosítsd, másold másik failure domainbe, és tarts
legalább 30 napi példányt. Havonta izolált környezetben végezz restore-próbát.
RPO cél: 24 óra vagy az üzleti igény szerinti sűrűbb mentés. RTO cél: 60 perc.

Visszaállítás:

```bash
docker compose stop
MISERERE_DATA_DIR=./data npm run restore -- backups/miserere-TIMESTAMP.sqlite
docker compose start
curl --fail http://localhost:8080/ready
```

## Monitorozás és riasztás

Scrape-old a `/metrics` végpontot 30 másodpercenként. Riasztási minimum:

- readiness három egymást követő hibája;
- 5xx arány 5 percig 2% felett;
- p95 válaszidő 5 percig 1 s felett;
- process restart vagy tartós memórianövekedés;
- sikertelen mentés vagy 36 óránál régebbi utolsó mentés;
- Sentry új regressziós issue.

A `/metrics` publikus interneten ne legyen elérhető; reverse proxyval vagy belső
hálózattal korlátozd.

## Incidenskezelés

1. Állítsd meg a további deployt.
2. Ellenőrizd a readiness, metrikák, JSON log és Sentry eseményeket.
3. Hibás release esetén rollback az előző digestre.
4. Adatsérülésnél állítsd le az írót, őrizd meg a hibás fájlt, majd ellenőrzött
   mentésből restore.
5. Dokumentáld az idővonalat, hatást, gyökérokot és megelőző intézkedést.
