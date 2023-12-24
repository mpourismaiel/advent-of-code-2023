# Advent Of Code 2023

Using Javascript to write stupid algorithms and get those sweet stars.

## New puzzle

Run `node ./create.js` to solve a new puzzle. It goes through the list of puzzles already solved and creates a new directory and files for the new puzzle.

## Running

To get answers you need to provide `prod-1-input.txt` and `prod-2-input.txt` if needed, feel them with the text input you get from the advent of code website.

Use terminal shell:

```
node ./run.js [day number] # node ./run.js 01
```

Or using vscode debugger (`.vscode/launch.js`):

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/run.js"
    }
  ]
}
```

## Benchmark

<!-- benchmark -->
| Day | Part 1 Test | Part 2 Test | Part 1 | Part2 |
| --- | ----------- | ----------- | ------ | ----- |
| **01**| 0.1181ms | 0.5825ms | 2.0652ms | 7.0378ms |
| **02**| 0.1889ms | 0.1659ms | 0.4333ms | 0.6651ms |
| **03**| 0.2547ms | 0.2688ms | 4.5861ms | 2.4175ms |
| **04**| 0.1641ms | 0.2662ms | 1.4137ms | 70.5865ms |
| **05**| 0.2640ms | 0.3544ms | 0.4179ms | 2.7870ms |
| **06**| 0.1135ms | 0.8257ms | 0.0223ms | 51.5436ms |
| **07**| 0.1670ms | 0.0404ms | 4.1487ms | 2.3539ms |
| **08**| 0.1719ms | 0.1816ms | 2.0762ms | 5.1916ms |
| **09**| 0.1513ms | 0.0517ms | 1.9652ms | 1.3044ms |
| **10**| 0.1653ms | 0.4339ms | 5.5783ms | 15.9019ms |
| **11**| 0.2506ms | 8.6212ms | 19.5076ms | 13.8752ms |
| **12**| 0.4019ms | 2.6291ms | 43.8999ms | 1908.1915ms |
| **13**| 0.2808ms | 0.1165ms | 3.6292ms | 4.9854ms |
| **14**| 0.0797ms | 1.7107ms | 1.9950ms | 108.2098ms |
| **15**| 0.1008ms | 0.3315ms | 1.2371ms | 3.4982ms |
| **16**| 0.2369ms | 1.1481ms | 7.6298ms | 1394.7998ms |
| **17**| 5.4647ms | 3.0789ms | 355.4765ms | 1372.2021ms |
| **18**| 0.2440ms | 0.1924ms | 0.2784ms | 0.3137ms |
| **19**| 0.3190ms | 0.3930ms | 3.0785ms | 4.1106ms |
| **20**| 3.1557ms | N/A | 17.2028ms | 27.1613ms |
| **21**| 0.3513ms | N/A | 23.8427ms | 290.0865ms |
