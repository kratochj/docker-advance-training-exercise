#!/bin/bash

sleep 1000 &
SLEEP_PID=$!

trap "{ echo EXITING ${SLEEP_PID}; kill ${SLEEP_PID}; exit 1; }" EXIT

wait ${SLEEP_PID}
