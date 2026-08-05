/**
 * Tiny, dependency-free Java tokenizer → HTML with monochrome token classes
 * (see `.code-token-*` utilities in index.css). Good enough for viva browsing;
 * never attempts full Java grammar.
 */

const KEYWORDS =
  "abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|record|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while|null|true|false";

const TOKEN_RE = new RegExp(
  [
    "(\\/\\*[\\s\\S]*?\\*\\/)", // block comment
    "(\\/\\/[^\\n]*)", // line comment
    '("(?:[^"\\\\\\n]|\\\\.)*")', // string literal
    "('(?:[^'\\\\\\n]|\\\\.)*')", // char literal
    "(@[A-Za-z_][\\w.]*)", // annotation
    `(\\b(?:${KEYWORDS})\\b)`, // keyword
    "(\\b\\d[\\d_]*(?:\\.\\d+)?[fLdD]?\\b)", // number
  ].join("|"),
  "g",
);

const CLASSES = [
  "code-token-comment",
  "code-token-comment",
  "code-token-string",
  "code-token-string",
  "code-token-annotation",
  "code-token-keyword",
  "code-token-number",
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function highlightJava(code: string): string {
  let html = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(TOKEN_RE.source, "g");

  while ((match = regex.exec(code)) !== null) {
    html += escapeHtml(code.slice(lastIndex, match.index));
    let className = "code-token-keyword";
    for (let i = 1; i <= 7; i++) {
      if (match[i] !== undefined) {
        className = CLASSES[i - 1];
        break;
      }
    }
    html += `<span class="${className}">${escapeHtml(match[0])}</span>`;
    lastIndex = match.index + match[0].length;
  }
  html += escapeHtml(code.slice(lastIndex));
  return html;
}
