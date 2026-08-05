# OpenTofu/Terraform telepítés

Az IaC egy helyi vagy SSH-n elérhető Docker hoston immutable digest alapján
hozza létre az egyetlen alkalmazáskonténert és a tartós volume-ot.

```bash
cd infra
tofu init
tofu plan \
  -var 'docker_host=ssh://deploy@example.com' \
  -var 'image=ghcr.io/aporkolab/miserere-mei@sha256:…' \
  -var 'public_origin=https://miserere.example.com' \
  -var 'jwt_secret=…'
tofu apply
```

A state-et titkosított távoli backendben tartsd; secretet ne adj parancssorban
valódi production futásnál, hanem `TF_VAR_jwt_secret` vagy CI secret
segítségével. A reverse proxy és TLS a host/platform felelőssége. Frissítés az
`image` digest módosításával történik; rollback az előző digest visszaállítása.
