#!/bin/bash

function git_commit_and_push() {
  git add . || { echo "Error: Failed to add changes for commit."; return 1; }

  echo "Enter a clear and concise commit message (one line recommended):"
  read -r COMMIT_MSG

  if [[ -z "$COMMIT_MSG" ]]; then
    echo "Error: Please provide a commit message."
    return 1
  fi

  git commit -m "$COMMIT_MSG" || { echo "Error: Failed to commit changes."; return 1; }

  git push origin $(git rev-parse --abbrev-ref HEAD) || { echo "Error: Failed to push changes."; return 1; }

  echo "Successfully committed and pushed changes!"
}

git_commit_and_push || exit 1
