#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?set DEPLOY_HOST=user@host}"
: "${DEPLOY_PATH:?set DEPLOY_PATH=/var/www/linux-bash-notes}"

ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_PATH'"
rsync -av --delete \
  --exclude '.git' \
  --exclude 'deploy.sh' \
  --exclude 'README.md' \
  ./ "$DEPLOY_HOST:$DEPLOY_PATH/"

echo "deployed to $DEPLOY_HOST:$DEPLOY_PATH"
