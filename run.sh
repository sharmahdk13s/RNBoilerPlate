#!/bin/bash
set -e

# --- START: Resolve the actual script directory ---
# This handles script being run as a symlink, which is what npx does.
SOURCE="${BASH_SOURCE[0]}"
while [ -L "$SOURCE" ]; do # Use -L to check for symlink, more portable than -h
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
SCRIPT_DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
# --- END: Resolve the actual script directory ---

# Run the setup script using its absolute path
node "$SCRIPT_DIR/setup.js"

# Find the latest created directory, which will be our project
PROJECT_NAME=$(ls -td -- */ | head -n 1 | cut -d'/' -f1)

# Check if a project name was found
if [ -z "$PROJECT_NAME" ]; then
  echo "Could not determine the project directory. Please 'cd' into it manually."
  exit 1
fi

# Change into the project directory
cd "$PROJECT_NAME"

# You can add any other commands you want to run inside the project directory here
echo "Successfully changed into the project directory: $PROJECT_NAME"
echo "You are now in the project directory. You can run your yarn commands."

# Optional: Start an interactive shell session in the new directory
# This will keep the terminal open in the new directory
exec "$SHELL"