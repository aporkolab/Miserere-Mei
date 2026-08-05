#!/bin/sh
set -eu
if [ "$#" -ne 1 ]; then echo "usage: $0 BACKUP.sqlite" >&2; exit 64; fi
backup="$1"
data_dir="${MISERERE_DATA_DIR:-./data}"
test -f "$backup"
if [ -f "$backup.sha256" ]; then
  if command -v sha256sum >/dev/null 2>&1; then sha256sum -c "$backup.sha256"; else shasum -a 256 -c "$backup.sha256"; fi
fi
mkdir -p "$data_dir"
sqlite3 "$backup" "PRAGMA integrity_check;" | grep -qx ok
cp "$backup" "$data_dir/miserere.sqlite.restore"
mv "$data_dir/miserere.sqlite.restore" "$data_dir/miserere.sqlite"
echo "restore complete"
