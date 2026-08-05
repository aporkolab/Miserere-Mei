# Miserere Mei v1.7.0

## The Precarious Trails to the Library of Preachers

[![CI](https://img.shields.io/github/actions/workflow/status/APorkolab/Miserere-Mei/ci.yml?branch=main&label=CI)](../../actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.7.0-63e6ff)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-CC--BY--NC--ND--4.0-8a7dff)](#licenc-és-jogi-információk)
[![Angular](https://img.shields.io/badge/Angular-22-dd0031)](frontend/package.json)
[![Node](https://img.shields.io/badge/Node.js-24-43853d)](backend/package.json)

![Miserere Mei](frontend/src/assets/img/logos/miserere.png)

A **Miserere Mei – The Precarious Trails to the Library of Preachers** modern,
képekkel, harcrendszerrel és adminisztrációs felülettel kibővített szöveges
kalandjáték. A klasszikus lapozgatós könyvek döntésközpontú szerkezetét a
kilencvenes évek szöveges kalandjátékainak hangulatával és egy mai webalkalmazás
eszköztárával kapcsolja össze.

> A sivatag nem felejt. Minden útvonal döntés, minden döntés veszteség lehet, és
> valahol a látóhatáron túl még mindig vár a Prédikátorok Könyvtára.

## Tartalom

- [A játék története](#a-játék-története)
- [A projekt eredete](#a-projekt-eredete)
- [Játékmenet](#játékmenet)
- [Funkciók](#funkciók)
- [Azonnali indítás](#azonnali-indítás)
- [Fejlesztői környezet](#fejlesztői-környezet)
- [Konfiguráció](#konfiguráció)
- [Szerepkörök és biztonság](#szerepkörök-és-biztonság)
- [Architektúra és üzemeltetés](#architektúra-és-üzemeltetés)
- [Verziótörténet](#verziótörténet)
- [Alkotók, források és kreditek](#alkotók-források-és-kreditek)
- [További tervek](#további-tervek)

## A játék története

A történet a 2050-es évek posztapokaliptikus világában, a **Pusztulás Földjén**
játszódik. A civilizáció maradványait kietlen sivatag, elhagyott bányák,
veszélyes alagutak, őslakos települések, útonállók és egymással versengő túlélők
választják el egymástól.

A játékos **Cantus Planust**, egy zsoldost irányítja. Cantus megbízást kap az
idős paptól, **Gregoriótól**: öt fiatalt – **Altust, Tenort, Bassust és a
Superia nővéreket** – kell épségben eljuttatnia a **Prédikátorok Könyvtárába**.
A fiatalokban és általuk tovább élő zenét a könyvtárosoknak kell lejegyezniük,
hogy az ne vesszen el az emberiséggel együtt.

Az út a kegyetlen sivatagon keresztül vezet. A küldetésről tudomást szerez a
térség könyörtelen hadura, **Falsetto**, aki minden eszközzel megpróbálja
megakadályozni, hogy a társaság elérje a könyvtárat. Cantusnak nemcsak az
ellenfelekkel kell megküzdenie: el kell döntenie, mikor vállal kockázatot, kiben
bízik meg, melyik útvonalat választja, és mit áldoz fel a küldetés sikeréért.

A történetnek létezik biztonságosabb útvonala, de a nagyobb kockázat értékes
tárgyakat, új helyszíneket és más narratív részleteket nyithat meg. A döntések
közvetlenül alakítják az utazást, az erőforrásokat és a túlélés esélyét. A
megfelelő útvonalon egy végigjátszás körülbelül fél óra, de az elágazások
felfedezése több nekifutást kíván.

### English story synopsis

The game takes place in the post-apocalyptic 2050s, in the **Land of
Desolation**. The player controls **Cantus Planus**, a mercenary hired by the
old priest **Gregorio** to escort five young people – **Altus, Tenor, Bassus and
the Superia sisters** – to the **Library of Preachers**. The librarians must
preserve the music living in and through them for posterity.

Their journey crosses a brutal desert filled with danger. **Falsetto**, the
ruthless warlord of the region, learns about the mission and sets out to stop
it. The player's task is to guide the group to the Library alive, balancing
safer paths against riskier routes that may yield greater rewards.

## A projekt eredete

A Miserere Mei ötlete egy gondolatkísérletből született: lehetséges-e a
számítástechnika hőskorából ismert szöveges kalandjátékot modern webes
eszközökkel és az ezredforduló utáni videojátékok néhány jellemzőjével
újraértelmezni?

Az első változatot Dr. Porkoláb Ádám 2020 szeptembere és október vége között, az
OKTÁV Zrt. szoftverfejlesztő képzésének vizsgaremekeként készítette el Java
nyelven. A projekt később Spring Boot és Angular alapokra került, majd
Node.js/Express backenddel, teljes Angular frontenddel, SQL-adatbázissal és
konténeres futtatással fejlődött tovább.

A vizuális világ egységes, AI által generált helyszínképekkel bővült. A v1.7 a
történeti projektet production szemléletű webalkalmazássá szervezi: modern
biztonsági modellel, automatizált tesztekkel, megfigyelhetőséggel, migrációkkal
és egyetlen indítható Docker image-dzsel.

## Játékmenet

- **Elágazó helyszínek:** minden döntés más helyszínre, eseményhez vagy
  összecsapáshoz vezethet.
- **Kockázat és jutalom:** a biztonságosabb út nem feltétlenül a leggazdagabb
  vagy legérdekesebb út.
- **Körökre osztott harc:** a fegyver sebzése, a lőszer, a játékos és az
  ellenfél életereje egyaránt számít.
- **Készletkezelés:** a megtalált gyógyszer, lőszer, fegyver és felszerelés
  túlélést vagy új lehetőséget adhat.
- **Erőforrás-döntések:** egy tárgy azonnali felhasználása és későbbi megőrzése
  között gyakran nincs egyértelmű választás.
- **Újrajátszhatóság:** az alternatív útvonalak, mellékküldetések és rejtett
  történetrészek több végigjátszást támogatnak.

## Funkciók

### Játék

- teljes, végigjátszható fő küldetés és mellékútvonalak;
- narrációs helyszínek és döntési pontok;
- körökre osztott harcrendszer;
- ellenfelek, életerő, fegyversebzés és lőszer;
- készlet, felvehető és használható tárgyak;
- térkép, játékosállapot és game-over folyamat;
- reszponzív, high-tech, mobilbarát felület;
- egységes helyszínillusztrációk.

### Adminisztráció

- felhasználói fiókok és bejelentkezés;
- felhasználó-, helyszín- és játékosadat-kezelés;
- mezővalidáció, keresés, szerkesztés és törlés;
- szerveroldali szerepkör- és mezőszintű védelem.

### Professzionális platformréteg

- Angular 22, Express 5, Node.js 24 és Sequelize 6;
- egyetlen production konténer Angular felülettel, API-val és SQLite-adattárral;
- opcionális külső MySQL nagyobb telepítésekhez;
- verziózott Umzug-adatbázismigrációk és idempotens seed;
- HttpOnly session cookie, CSRF-origin védelem, RBAC, Helmet és rate limit;
- Prometheus metrikák és opcionális Sentry hibakövetés;
- unit-, E2E-, WCAG- és vizuális regressziós tesztek;
- staging/production pipeline, rollback, SBOM és build provenance;
- OpenTofu/Terraform alapú Docker-host telepítés;
- ellenőrzőösszeges mentés és integritásvizsgált visszaállítás.

## Azonnali indítás

Előfeltétel: Docker 24+ Compose pluginnal.

```bash
cp .env.example .env
# Írd át legalább a JWT_SECRET, ADMIN_EMAIL és ADMIN_PASSWORD értékét.
docker compose up --build
```

Az alkalmazás ezután a <http://localhost:8080> címen érhető el. Az adatbázist a
`miserere_data` volume őrzi meg frissítés és konténercsere után is. Beépített
production admin-jelszó nincs.

Compose nélkül:

```bash
docker build -t miserere-mei:1.7.0 .
docker run --rm -p 8080:8080 -v miserere-data:/data \
  -e JWT_SECRET="$(openssl rand -hex 32)" \
  -e CORS_ORIGIN=http://localhost:8080 \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD='egyedi-erős-jelszó' \
  miserere-mei:1.7.0
```

## Fejlesztői környezet

Előfeltétel: Node.js 24 és npm 10+.

```bash
npm ci
npm ci --prefix backend
npm ci --prefix frontend
npm start
```

A fejlesztői frontend alapértelmezetten a `4200`, az API a `3000` portot
használja.

Minőségkapuk:

```bash
npm run lint
npm test
npm run build
npm run e2e
npm run security:audit
docker build -t miserere-mei:test .
```

## Konfiguráció

| Változó                                                   | Jelentés                                                  | Egykonténeres alapérték                 |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------- |
| `JWT_SECRET`                                              | legalább 32 karakteres JWT-aláíró kulcs                   | nincs biztonságos alapérték             |
| `CORS_ORIGIN`                                             | engedélyezett origin; több érték vesszővel választható el | `http://localhost:8080`                 |
| `COOKIE_SECURE`                                           | HTTPS-only session cookie                                 | lokálisan `false`; productionben `true` |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`                           | első admin létrehozása üres adatbázisban                  | nincs                                   |
| `ADMIN_FIRST_NAME`, `ADMIN_LAST_NAME`                     | első admin megjelenített neve                             | `Admin`, `User`                         |
| `DB_DIALECT`                                              | `sqlite` vagy `mysql`                                     | `sqlite`                                |
| `DB_STORAGE`                                              | SQLite-adatbázisfájl                                      | `/data/miserere.sqlite`                 |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | opcionális külső MySQL kapcsolat                          | nincs                                   |
| `SEED_DATABASE`                                           | üres játéktér kezdeti feltöltése                          | `true`                                  |
| `SENTRY_DSN`                                              | opcionális Sentry hibakövetés                             | kikapcsolva                             |
| `TRUST_PROXY`                                             | egy megbízható reverse proxy kezelése                     | `false`                                 |

## Szerepkörök és biztonság

| Szerep         | Adatbázisérték | Hozzáférés a v1.7-ben                                                           |
| -------------- | -------------: | ------------------------------------------------------------------------------- |
| Felhasználó    |              1 | nyilvános játék és nem adminisztratív funkciók                                  |
| Szerkesztő     |              2 | fenntartott kompatibilitási szerep; admin API-hozzáférést nem kap automatikusan |
| Adminisztrátor |              3 | felhasználók, helyszínek és játékosadatok kezelése                              |

A böngésző nem tárol JWT-t Web Storage-ban. A hitelesítés egyórás, issuer- és
audience-ellenőrzött JWT-vel történik, amely `HttpOnly`, `SameSite=Strict`,
productionben `Secure` cookie-ba kerül. A módosító cookie-kérések
origin-ellenőrzést kapnak, az admin API-k pedig szerveroldali
jogosultságvizsgálat mögött állnak.

## Architektúra és üzemeltetés

```text
Böngésző
   │ HTTPS + HttpOnly session
   ▼
Express 5 :8080
   ├── Angular 22 statikus alkalmazás
   ├── REST API és adminisztráció
   ├── /health, /ready és /metrics
   └── Sequelize
          ├── SQLite volume (alapértelmezett)
          └── MySQL 8 (opcionális)
```

Üzemeltetési végpontok:

- `GET /health`: alkalmazás- és adatbázis-állapot;
- `GET /ready`: orchestrator readiness;
- `GET /metrics`: Prometheus-formátumú runtime- és HTTP-metrikák.

Mentés és visszaállítás:

```bash
npm run backup
npm run restore -- backups/miserere-YYYYMMDDTHHMMSSZ.sqlite
```

A mentés SHA-256 ellenőrzőösszeget kap, a restore pedig
SQLite-integritásvizsgálat után, atomikusan cseréli az adatfájlt. Production
használat előtt olvasd el a [telepítési runbookot](docs/DEPLOYMENT.md).

## Verziótörténet

### v1.7.0 — production platform és egységes futtatás

- Angular és backend frissítése;
- high-tech reszponzív design és javított játékmenet;
- javított harc-, inventory-, helyszín-, azonosító- és adminfolyamatok;
- biztonságos cookie-alapú session és szerveroldali RBAC;
- függőségi sérülékenységek megszüntetése;
- verziózott migrációk, metrikák, hibakövetés és backup/restore;
- E2E, vizuális regressziós és akadálymentességi minőségkapuk;
- egységes Docker image, IaC, staging, release és rollback folyamat;
- teljes dokumentációs és üzemeltetési korszerűsítés.

### v1.0.3 — SQL és Docker

- a backend SQL-adatbázisra került;
- megjelent az első Docker-alapú futtatás.

### v1.0 — teljes webes újraírás

- Node.js és Express backend;
- Angular 14 frontend;
- helyszín- és felhasználószerkesztő teljes validációval;
- végigjátszható játéktér és mellékküldetések;
- készlet, tárgyhasználat és harcrendszer;
- egységes, AI által generált helyszínképek.

### v0.8 — korai webes változat

- végigjátszható fő küldetés;
- Spring Boot backend és részleges Angular 12 frontend;
- XML-alapú helyszínszövegek;
- működő, de még hibás korai harcrendszer;
- stockfotók helyszínillusztrációként.

A részletes kiadási lista a [CHANGELOG.md](CHANGELOG.md) fájlban található.

## Alkotók, források és kreditek

**Írta, tervezte és fejlesztette:** Dr. Porkoláb Ádám<br> **Stúdió:** Hootie in
Bootee Studio<br> **Kapcsolat:** `ap kukac aporkolab pont com`

Felhasznált vagy inspirációként szolgáló eszközök és források:

- **Grafika és vizuális alapanyagok:**
  [Midjourney AI](https://www.midjourney.com/home/)
- **Kiindulási dashboard template:**
  [Creative Tim – Soft UI Dashboard](https://www.creative-tim.com/product/soft-ui-dashboard)
- **Szöveges megjelenítés eredeti template-forrása:**
  [Baris Senkal – Short Story HTML Template](https://github.com/barissenkal/Short-Story-HTML-Template)
- **A 403 oldal eredeti inspirációja:**
  [Blissful Lemon CodePen](https://codepen.io/ablissfullemon/pen/zJepap)

Az aktuális v1.7 kezelőfelület, komponensstruktúra és high-tech vizuális
rendszer jelentősen továbbfejlesztett, egyedi megvalósítás.

## Licenc és jogi információk

Írta, fejlesztette és publikálta: **Dr. Porkoláb Ádám – Hootie in Bootee
Studio**.

<a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

Ez a mű a
[Creative Commons Nevezd meg! – Ne add el! – Ne változtasd! 4.0 Nemzetközi Licenc](https://creativecommons.org/licenses/by-nc-nd/4.0/)
feltételei szerint használható fel.

## További tervek

Az eredeti projekttervek továbbra is releváns kreatív irányok:

- beépített hangok és atmoszférikus zene;
- több ellenfél, tárgy és felszerelés;
- alternatív befejezések;
- további történeti útvonalak és mellékküldetések;
- a világ vagy a történet folytatása.

## További dokumentáció

- [Architektúra](docs/ARCHITECTURE.md)
- [Telepítés és üzemeltetési runbook](docs/DEPLOYMENT.md)
- [OpenTofu/Terraform IaC](infra/README.md)
- [Biztonsági szabályzat](SECURITY.md)
- [Közreműködés](CONTRIBUTING.md)
- [Változásnapló](CHANGELOG.md)
