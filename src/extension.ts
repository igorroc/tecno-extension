import * as vscode from "vscode";

const links = [
	{
		label: "Tecno Site",
		url: "https://www.tecnojr.com.br",
	},
	{
		label: "Github - TecnoJr",
		url: "https://www.github.com/tecnojr",
	},
	{
		label: "Github - DevTeam",
		url: "https://www.github.com/devteam-tecno",
	},
];
const cores = [
	{
		label: "Primary Blue",
		detail: "#5A7BE7",
	},
	{
		label: "Secondary Blue",
		detail: "#3550BB",
	},
	{
		label: "Tertiary Blue",
		detail: "#273B8B",
	},
	{
		label: "Primary Purple",
		detail: "#CC8AFF",
	},
	{
		label: "Secondary Purple",
		detail: "#9256EB",
	},
	{
		label: "Tertiary Purple",
		detail: "#5E16CA",
	},
];
const readmeMD = `<span id="topo"></span>

# Nome do projeto

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

<img src="../assets/capa.png" alt="exemplo imagem">

> Linha adicional de texto informativo sobre o que o projeto faz. Sua introdução deve ter cerca de 2 ou 3 linhas. Não exagere, as pessoas não vão ler.

## 🚩 Informações do projeto

<!-- Deixe apenas um -->

![Status do projeto](https://img.shields.io/badge/status-fazendo-green)
![Status do projeto](https://img.shields.io/badge/status-pausado-yellow)
![Status do projeto](https://img.shields.io/badge/status-finalizado-red)

Faça uma descrição geral do projeto aqui. Você pode incluir qualquer informação adicional que você acha que é relevante para o leitor.

-   ### Links úteis

    -   [Link para a build](#)
    -   [Link para o Trello](#)
    -   [Link para o Figma](#)
    -   [Link para o Notion](#)
    -   [Link para o Drive](#)
    -   [Link para o canal no Discord](#)

-   ### Ajustes e melhorias

    O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

    -   [x] Tarefa 1
    -   [x] Tarefa 2
    -   [x] Tarefa 3
    -   [ ] Tarefa 4
    -   [ ] Tarefa 5

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

<!-- Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário -->

-   Você instalou a versão mais recente de \`<linguagem / dependência / requeridos>\`
-   Você tem uma máquina \`<Windows / Linux / Mac>\`. Indique qual sistema operacional é compatível / não compatível.
-   Você leu \`<guia / link / documentação_relacionada_ao_projeto>\`.

## 🚀 Instalando <nome_do_projeto>

Para instalar o <nome_do_projeto>, siga estas etapas:

Linux e macOS:

\`\`\`bash
$ <comando_de_instalação>
\`\`\`

Windows:

\`\`\`bash
$ <comando_de_instalação>
\`\`\`

## ☕ Usando <nome_do_projeto>

Para usar <nome_do_projeto>, siga estas etapas:

\`\`\`bash
$ <exemplo_de_uso>
\`\`\`

Adicione comandos de execução e exemplos que você acha que os usuários acharão úteis. Fornece uma referência de opções para pontos de bônus!

## 🤝 Equipe

Membros da equipe de desenvolvimento do projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/igorroc">
        <img src="https://github.com/igorroc.png" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <b>Igor Rocha</b>
        <p>Desenvolvedor Front</p>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://s2.glbimg.com/FUcw2usZfSTL6yCCGj3L3v3SpJ8=/smart/e.glbimg.com/og/ed/f/original/2019/04/25/zuckerberg_podcast.jpg" width="100px;" alt="Foto do Mark Zuckerberg"/><br>
        <b>Mark Zuckerberg</b>
        <p>Desenvolvedor Back</p>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://miro.medium.com/max/360/0*1SkS3mSorArvY9kS.jpg" width="100px;" alt="Foto do Steve Jobs"/><br>
        <b>Steve Jobs</b>
        <p>Designer</p>
      </a>
    </td>
  </tr>
</table>

[⬆ Voltar ao topo](#topo)<br>
`;

export function activate(context: vscode.ExtensionContext) {
	console.log("[TECNO] Active!");

	let tecnocodeLinks = vscode.commands.registerCommand(
		"tecnocode.links",
		async function () {
			const link = await vscode.window.showQuickPick(links);

			if (!link) {
				return;
			}

			vscode.env.openExternal(vscode.Uri.parse(link.url));
		}
	);
	let tecnocodePrettier = vscode.commands.registerCommand(
		"tecnocode.prettier",
		function () {
			vscode.workspace
				.openTextDocument({
					content: `{
	"useTabs": true,
	"tabWidth": 4,
	"semi": false,
	"singleQuote": false,
	"trailingComma": "es5",
	"bracketSpacing": true,
	"printWidth": 100
}`,
					language: "*",
				})
				.then(async (doc) => {
					console.log(doc);
					await doc.save();
				})
				.then(() => {
					vscode.window.showInformationMessage(
						"Arquivo de configuração do prettier criado com sucesso!"
					);
				});
		}
	);
	let tecnocodeReadme = vscode.commands.registerCommand(
		"tecnocode.readme",
		function () {
			vscode.workspace
				.openTextDocument({
					content: readmeMD,
					language: "markdown",
				})
				.then(async (doc) => {
					console.log(doc);
					await doc.save();
				})
				.then(() => {
					vscode.window.showInformationMessage(
						"Arquivo README.md criado com sucesso!"
					);
				});
		}
	);
	let tecnocodeColors = vscode.commands.registerCommand(
		"tecnocode.colors",
		async function () {
			const cor = await vscode.window.showQuickPick(cores);

			if (!cor) {
				return;
			}

			if (!vscode.window.activeTextEditor) {
				vscode.env.clipboard.writeText(cor.detail);
				vscode.window.showInformationMessage(
					`A cor ${cor.label} foi copiada para a area de transferência!`
				);
				return;
			}

			vscode.window.activeTextEditor?.insertSnippet(
				new vscode.SnippetString(cor.detail)
			);
		}
	);

	context.subscriptions.push(
		tecnocodeLinks,
		tecnocodePrettier,
		tecnocodeReadme,
		tecnocodeColors
	);
}

export function deactivate() {}
