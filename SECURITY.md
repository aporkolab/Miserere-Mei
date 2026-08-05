# Biztonsági szabályzat

## Támogatott verzió

| Verzió | Állapot            |
| ------ | ------------------ |
| 1.7.x  | aktívan támogatott |
| < 1.7  | nem támogatott     |

Mindig a legfrissebb `1.7.x` kiadást használd.

## Sérülékenység bejelentése

Ne nyiss nyilvános issue-t. Küldd a leírást az `ap kukac aporkolab pont com`
címre `SECURITY:` tárggyal. Add meg az érintett verziót, hatást, reprodukciót és
– ha biztonságosan megosztható – minimális proof of conceptet. Cél: 48 órán
belüli visszaigazolás, kritikus hibánál azonnali triage, összehangolt publikálás
a javítás kiadása után.

## v1.7 védelmi modell

- HttpOnly, productionben Secure, SameSite=Strict session cookie;
- egyórás, issuer- és audience-ellenőrzött HS256 JWT;
- origin-alapú CSRF-védelem és explicit CORS allowlist;
- szerveroldali RBAC az admin végpontokon;
- bcrypt jelszóhash és időzítés-kiegyenlített hibás login;
- inputméret-, típus-, ID- és írhatómező-korlátozás;
- Helmet fejlécek, rate limit és rejtett technológiai fejléc;
- nem root production container és csak egy publikus port;
- verziózott migrációk, függőségi audit, lockfile-ok;
- opcionális Sentry, Prometheus metrika és strukturált napló.

## Production követelmények

- Legalább 32 véletlen bájtból származó `JWT_SECRET` secret managerben.
- HTTPS a teljes publikus útvonalon; pontos `CORS_ORIGIN`.
- `/metrics` csak belső monitorozó hálózaton.
- Titkosított, külön failure domainben tartott és rendszeresen
  visszaállítás-próbázott backup.
- GitHub production Environment jóváhagyással és rövid jogosultságú deploy
  tokennel.
- Rendszeres image- és npm-audit, OS patch, Sentry/5xx riasztás.

## Korlátok

Az alap SQLite mód egyetlen író példányra készült. Több replika esetén külső
MySQL és elosztott rate-limit szükséges. A session cookie egyórás és nem
refresh-tokenes; magasabb kockázatú vagy hosszú munkamenetes adminrendszernél
külön identity provider, MFA és rotált refresh session javasolt.
