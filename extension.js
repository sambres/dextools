const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "dextools.convert_doc_to_json",
    function () {
      // Set the document language mode to json
      vscode.languages.setTextDocumentLanguage(
        vscode.window.activeTextEditor.document,
        "json"
      ).then(() => {
        // format the active document
        vscode.commands.executeCommand("editor.action.formatDocument");
      });

    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated

module.exports = {
  activate,
};
