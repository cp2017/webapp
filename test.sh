#!/bin/bash

xvfb-run --server-args="-screen 0 1024x768x24" ng test --watch=false --single-run --code-coverage --log-level=debug
