#!/usr/bin/env bash

set -e

EXECUTABLE=""

for p in /bin /sbin /usr/bin /usr/sbin; do
    if [[ -x ${p}/journalctl ]]; then
        EXECUTABLE=${p}/journalctl
        break 2
    fi
done

if [[ -x ${EXECUTABLE} ]]; then
    ${EXECUTABLE} --output=json --boot --utc --no-pager
    exit 0
else
    gunzip -c mock_data/journalctl.json
    exit 0
fi

# 'journalctl --output=json --boot --utc --no-pager --unit=sshd.socket'
