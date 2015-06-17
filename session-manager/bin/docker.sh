#!/usr/bin/env bash

set -e

EXECUTABLE=""

for p in /bin /sbin /usr/bin /usr/sbin; do
    if [[ -x ${p}/docker ]]; then
        EXECUTABLE=${p}/docker
        break 2
    fi
done

if [[ -x ${EXECUTABLE} ]]; then
    ${EXECUTABLE} logs -t -- $1
    exit 0
else
    gunzip -c mock_data/docker.log
    exit 0
fi
