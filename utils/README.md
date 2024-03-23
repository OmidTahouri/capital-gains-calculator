# Merge two Charles Schwab Transactions JSON files
This directory contains a simple script, `merge.js`, which accepts two JSON files conforming to the Charles Schwab Transactions history format as input and then outputs a single JSON file with all the transactions merged together.

This script aims to reduce the "manual" work referred to [here](https://github.com/KapJI/capital-gains-calculator/blob/325a7eaa22266d6621ac30997e693e0bc7a5e7a6/cgt_calc/parsers/schwab_equity_award_json.py#L12]).

The script requires 2 arguments; `filePath1` and `filePath2`. The output file can optionally be specified with the `-o` flag; defaults to `merged.json` if not specified.

## Usage
From `./capital-gains-calculator/utils`
```
npm install
node ./merge.js path/to/2017-2021.json /path/to/2021-2024.json -o merged-2017-2024.json
```
