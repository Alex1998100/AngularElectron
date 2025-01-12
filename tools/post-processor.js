const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'angular-electron1', 'browser', 'index.html');

function updateIndexHtml() {
  try {
    let html = fs.readFileSync(indexPath, 'utf-8');
    if (html.includes('<base href="./"')) {
      console.log('Base href already correct. Skipping update.');
      return;
    }
    html = html.replace('<base href="/"', '<base href="./"');
    html = html.replace(/ (href|src)="([^"]+)"/g, (match, attribute, value) => {
      if (value === "favicon.ico") return match;
      if (value.startsWith("./")) return match; 
      return ` ${attribute}="./${value}"`;
    });
    fs.writeFileSync(indexPath, html);
    console.log('index.html updated successfully.');
  } catch (error) {
    console.error('Error updating index.html:', error);
  }
}

updateIndexHtml();