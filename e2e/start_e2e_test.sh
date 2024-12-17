#!/bin/bash

# Set default values
DEFAULT_INSTANCE="local"
DEFAULT_PORT="8091"
DEFAULT_TEST=""

# Get arguments and default values if not provided
INSTANCE=${1:-$DEFAULT_INSTANCE}
PORT=${2:-$DEFAULT_PORT}
TEST=${3:-$DEFAULT_TEST}

# Clean UP
cleanup() {
    cd ../wiremock
    ./stop.sh $INSTANCE
}
trap cleanup SIGINT

# Run Test
cd ../wiremock
./start.sh $INSTANCE $PORT
sleep 2
cd ../e2e
npm run test $TEST
cd ../wiremock
./stop.sh $INSTANCE
