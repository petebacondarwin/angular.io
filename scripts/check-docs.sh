#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh > /dev/null

SITE=./www

CHECK_FOR=bad-code-excerpt

LOGFILE_PREFIX=$CHECK_FOR-log
LOGFILE_FULL=$TMP/$LOGFILE_PREFIX-full.txt
LOGFILE=$TMP/$LOGFILE_PREFIX.txt

SKIPFILE_BASE=$CHECK_FOR-skip-patterns.txt
SKIPFILE_SRC=./scripts/config/$SKIPFILE_BASE
SKIPFILE=$TMP/$SKIPFILE_BASE

if [[ ! -d $SITE ]]; then
    echo "Missing site folder $SITE"
    exit 1;
fi

travis_fold start $CHECK_FOR
echo "Searching site for HTML files containing bad code excerpts (BAD FILENAME)."
echo
echo "Full file list:"

find $SITE -type f -name "*.html" -exec grep -le "BAD FILENAME" {} \; | tee $LOGFILE_FULL

echo
echo "Skip patterns for paths of files known to have issues ($SKIPFILE_SRC):"

perl -pe 's/(\s+|\s*#.*)$/\n/g' $SKIPFILE_SRC | \
    # Remove blank lines \
    grep '.' > $SKIPFILE
cat $SKIPFILE
echo
echo "File list excluding those matching skip patterns:"
grep -v -E -f $SKIPFILE $LOGFILE_FULL | tee $LOGFILE || true

if [[ ! -s $LOGFILE ]]; then
    echo "No matches, all is good!"
    travis_fold end $CHECK_FOR
else
    exit 1;
fi
