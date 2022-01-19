import * as vscode from 'vscode';


const formatJson = (): Thenable<any> => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    // Set the document language mode to json
    return vscode.languages.setTextDocumentLanguage(
      editor.document,
      "json"
    ).then(() =>
      // format the active document
      vscode.commands.executeCommand("editor.action.formatDocument")
    );
  }
  return Promise.resolve()
}

const formatLogs = () => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const text = document.getText();
    const all = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );

    let formatted = text.replace(/\}\s*\n/g, '},\n')
    formatted = '[' + formatted.replace(/\,\n$/g, '') + ']'

    return editor.edit(editBuilder => editBuilder.replace(all, formatted)
    ).then(formatJson);
  }
  return Promise.resolve()
}

export function activate(context: vscode.ExtensionContext) {
  const command1 = vscode.commands.registerCommand(
    "dextools.convert_doc_to_json",
    formatJson
  );

  const command2 = vscode.commands.registerCommand(
    "dextools.convert_logs_to_json",
    formatLogs
  );

  context.subscriptions.push(command1, command2);
}


