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
| **01**| 0.1398ms | 1.1399ms | 3.1789ms | 7.9685ms |
| **02**| 0.1883ms | 0.1519ms | 0.3333ms | 0.6511ms |
| **03**| 0.2357ms | 0.3699ms | 4.2269ms | 2.4249ms |
| **04**| 0.1839ms | 0.2988ms | 1.2429ms | 66.4438ms |
| **05**| 0.2460ms | 0.3174ms | 0.3853ms | 2.6847ms |
| **06**| 0.1070ms | 0.8405ms | 0.0131ms | 52.5907ms |
| **07**| 0.1703ms | 0.0379ms | 3.7032ms | 2.0638ms |
| **08**| 0.1823ms | 0.1678ms | 2.4252ms | 5.6662ms |
| **09**| 0.1945ms | 0.0794ms | 2.2586ms | 1.3065ms |
| **10**| 0.1627ms | 0.5240ms | 5.8288ms | 18.4694ms |
| **11**| 0.2757ms | 9.4522ms | 25.1755ms | 19.7093ms |
| **12**| 0.6300ms | 2.6238ms | 46.3922ms | 1892.6286ms |
| **13**| 0.3219ms | 0.1521ms | 4.5127ms | 7.9468ms |
| **14**| 0.1713ms | 1.8668ms | 2.3206ms | 112.7881ms |
| **15**| 0.0522ms | 0.3419ms | 1.5096ms | 3.5628ms |
| **16**| 0.1965ms | 1.1169ms | 7.4775ms | 1497.9993ms |
| **17**| 6.7415ms | 3.1640ms | 394.9358ms | 1401.1816ms |
| **18**| 0.1988ms | 0.1776ms | 0.2577ms | 0.3313ms |
| **19**| 0.3363ms | 0.4131ms | 3.1634ms | 1.7671ms |
