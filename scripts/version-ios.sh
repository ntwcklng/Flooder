#!/usr/bin/env bash -e

BLUE="$(tput setaf 4)"
NOCOLOR="$(tput sgr0)"
PROJECT_DIR="ios/$1"
INFOPLIST_FILE="Info.plist"
INFOPLIST_DIR="${PROJECT_DIR}/${INFOPLIST_FILE}"

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

BUILD_NUMBER=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${INFOPLIST_DIR}")
BUILD_NUMBER=$(($BUILD_NUMBER + 1))

echo Updating $BLUE$1$NOCOLOR
echo Updated Version to: $BLUE$PACKAGE_VERSION$NOCOLOR
echo Updated Build Number to: $BLUE$BUILD_NUMBER$NOCOLOR


# Update plist with new values
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${PACKAGE_VERSION#*v}" "${INFOPLIST_DIR}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $BUILD_NUMBER" "${INFOPLIST_DIR}"

git add "${INFOPLIST_DIR}"