#!/bin/sh
set -eu
data_dir="${MISERERE_DATA_DIR:-./data}"
backup_dir="${MISERERE_BACKUP_DIR:-./backups}"
mkdir -p "$backup_dir"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
sqlite3 "$data_dir/miserere.sqlite" ".backup '$backup_dir/miserere-$timestamp.sqlite'"
if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "$backup_dir/miserere-$timestamp.sqlite" > "$backup_dir/miserere-$timestamp.sqlite.sha256"
else
  shasum -a 256 "$backup_dir/miserere-$timestamp.sqlite" > "$backup_dir/miserere-$timestamp.sqlite.sha256"
fi
find "$backup_dir" -name 'miserere-*.sqlite' -mtime +"${BACKUP_RETENTION_DAYS:-30}" -delete
echo "$backup_dir/miserere-$timestamp.sqlite"
