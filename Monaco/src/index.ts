import monarch from './monarch';

export const Load = async (
	monaco: typeof import('monaco-editor/esm/vs/editor/editor.api'),
	extendedMonarch: Record<any, any> = {}
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
	monaco.languages.setMonarchTokensProvider('luax', {
		...monarch,
		...extendedMonarch,
	});

	// Define a new theme that contains only rules that match this language
	monaco.editor.defineTheme('luax-default', {
		base: 'vs-dark',
		inherit: true,
		rules: [
			{ token: 'global', foreground: '0ADC9C', fontStyle: 'light' },
			{ token: 'keyword', foreground: 'D556A9', fontStyle: 'bold' },
			{ token: 'comment', foreground: 'c89292' },
			{ token: 'number', foreground: 'a570ff' },
			{ token: 'string', foreground: 'ffc073' },
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
						kind: monaco.languages.CompletionItemKind.Function,
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
						label: 'forp',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: [
							'for ${3:_},${4:o} in pairs(${1:table})',
							'do',
							'\t${2:// Code}',
							'end;',
						].join('\n'),
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'For Loop',
						detail: 'For loop using pairs()',
					},
					{
						label: 'forip',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: [
							'for ${3:_},${4:o} in ipairs(${1:table})',
							'do',
							'\t${2:// Code}',
							'end;',
						].join('\n'),
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'For Loop',
						detail: 'For loop using ipairs()',
					},
					{
						label: 'forc',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: [
							'for ${3:_},${4:o} in pairs(${1:instance}:GetChildren())',
							'do',
							'\t${2:// Code}',
							'end;',
						].join('\n'),
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'For Loop, GetChildren',
						detail: '(Roblox) For each Child of Instance',
					},
					{
						label: 'ford',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: [
							'for ${3:_},${4:o} in pairs(${1:instance}:GetDescendants())',
							'do',
							'\t${2:// Code}',
							'end;',
						].join('\n'),
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'For Loop, GetDescendants',
						detail: '(Roblox) For each Descendant of Instance',
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
export default Load;
