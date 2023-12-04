# Advent Of Code 2023

Using Javascript to write stupid algorithms and get those sweet stars.

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
