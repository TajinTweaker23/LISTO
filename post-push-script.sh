#!/bin/bash
# This script is executed after a successful git push.
# You can add any commands here. For example, creating a backup.

echo "----------------------------------------"
echo "Successfully pushed changes to remote."
echo "Post-push hook executed at: $(date)"
echo "----------------------------------------"

# Example: Create a zip archive of the repository as a backup
# REPO_NAME="LISTO"
# BACKUP_DIR="$HOME/git_backups"
# mkdir -p "$BACKUP_DIR"
# TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
# git archive -o "$BACKUP_DIR/${REPO_NAME}_${TIMESTAMP}.zip" HEAD
# echo "Backup created at: $BACKUP_DIR/${REPO_NAME}_${TIMESTAMP}.zip"
