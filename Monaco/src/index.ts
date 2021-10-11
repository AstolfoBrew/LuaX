import monarch from './monarch';

export const Load = async (
	monaco: typeof import('monaco-editor/esm/vs/editor/editor.api')
) => {
	// Register a new language
	monaco.languages.register({ id: 'luax' });

	// Register a tokens provider for the language
	// monaco.languages.setMonarchTokensProvider('luax', {
	// 	tokenizer: {
	// 		root: [
	// 			[/\[error.*/, 'custom-error'],
	// 			[/\[notice.*/, 'custom-notice'],
	// 			[/\[info.*/, 'custom-info'],
	// 			[/\[[a-zA-Z 0-9:]+\]/, 'custom-date'],
	// 		],
	// 	},
	// });
	monaco.languages.setMonarchTokensProvider('luax', monarch);

	// Define a new theme that contains only rules that match this language
	monaco.editor.defineTheme('luax-default', {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'global', foreground: '0ADC9C', fontStyle: 'bold' },
			{ token: 'keyword', foreground: 'D556A9', fontStyle: 'bold' },
			{ token: 'comment', foreground: 'c89292' },
			{ token: 'number', foreground: 'a570ff' },
			{ token: 'string', foreground: 'ffc073' },
			{ token: 'global', foreground: '00aaff' },
		],
		colors: {
			'editor.background': '#100D23',
		},
	});

	// Register a completion item provider for the new language
	monaco.languages.registerCompletionItemProvider('luax', {
		// @ts-ignore
		provideCompletionItems: () => {
			return {
				suggestions: [
					{
						label: 'game',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: 'game',
					},
					{
						label: 'log',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: "print(${1:'Message'})",
						documentation: 'Assert Global',
					},
					{
						label: 'assert',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: "assert(${0:condition},${1:'No Message Provided.'})",
						documentation: 'Assert Global',
					},
					{
						label: 'if',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['if (${1:condition}) then', '\t$0', 'end'].join('\n'),
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'If Statement',
					},
					{
						label: 'ifelse',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: [
							'if (${1:condition}) then',
							'\t$0',
							'else',
							'\t$1',
							'end',
						].join('\n'),
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'If-Else Statement',
					},
				],
			};
		},
	});
};
