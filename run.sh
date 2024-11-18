#! /bin/bash

source .env

echo "Running docker container on http://0.0.0.0:$PORT"
echo "You can test endpoint here: http://0.0.0.0:$PORT/exchangers/binance/rates?pair=BTCUSDT"


docker run -p $PORT:$PORT youhodler-test
