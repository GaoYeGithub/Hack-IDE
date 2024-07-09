let editors = {
  html: ace.edit('editor'),
  css: null,
  js: null
};

let currentTab = 'html';

editors.html.setTheme('ace/theme/dracula');
editors.html.getSession().setMode('ace/mode/html');

function switchTab(tab) {
  if (!editors[tab]) {
    editors[tab] = ace.edit('editor');
    editors[tab].setTheme('ace/theme/dracula');
    editors[tab].getSession().setMode(`ace/mode/${tab}`);
  }

  editors[currentTab].container.style.display = 'none';
  editors[tab].container.style.display = 'block';
  currentTab = tab;
  updateTabButtons();
}

function updateTabButtons() {
  document.querySelectorAll('#tabs button').forEach(button => {
    button.classList.remove('active');
  });
  document.querySelector(`#tabs button[onclick="switchTab('${currentTab}')"]`).classList.add('active');
}

function runCode() {
  let htmlCode = editors.html.getValue();
  let cssCode = editors.css ? editors.css.getValue() : '';
  let jsCode = editors.js ? editors.js.getValue() : '';

  let combinedCode = `
    <style>${cssCode}</style>
    ${htmlCode}
    <script>${jsCode}<\/script>
  `;

  let blob = new Blob([combinedCode], { type: 'text/html' });
  let url = URL.createObjectURL(blob);
  document.getElementById('iframe').src = url;
}

window.onload = () => {
  switchTab('html');
};
