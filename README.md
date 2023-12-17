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
| **01**| 0.0965ms | 1.9474ms | 0.4353ms | 6.5849ms |
| **02**| 0.2685ms | 0.2971ms | 0.1116ms | 0.6106ms |
| **03**| 0.1948ms | 3.8167ms | 0.1812ms | 1.9237ms |
| **04**| 0.1512ms | 1.3844ms | 0.2190ms | 65.9776ms |
| **05**| 0.2545ms | 0.3807ms | 0.3035ms | 2.8730ms |
| **06**| 0.0905ms | 0.0108ms | 0.7507ms | 49.8639ms |
| **07**| 0.1680ms | 3.8129ms | 0.0356ms | 2.1836ms |
| **08**| 0.1724ms | 2.0890ms | 0.1471ms | 5.1208ms |
| **09**| 0.1494ms | 1.9052ms | 0.0552ms | 1.2194ms |
| **10**| 0.1603ms | 5.4603ms | 0.4375ms | 14.9907ms |
| **11**| 0.2374ms | 20.4279ms | 8.4771ms | 17.0026ms |
| **12**| 0.4173ms | 46.8741ms | 3.7222ms | 1804.7571ms |
| **13**| 0.2351ms | 3.3136ms | 0.1043ms | 6.9881ms |
| **14**| 0.0727ms | 1.9390ms | 1.6196ms | 105.6592ms |
| **15**| 0.0510ms | 1.4144ms | 0.3535ms | 3.4358ms |
| **16**| 0.1859ms | 6.9858ms | 1.0755ms | 1444.4197ms |
| **17**| 6.4737ms | 356.2360ms | 3.3686ms | 1299.0284ms |
