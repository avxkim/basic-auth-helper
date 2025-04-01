document.addEventListener('DOMContentLoaded', function() {
  // Save button click handler
  document.getElementById('saveBtn').addEventListener('click', function() {
    const domain = document.getElementById('domain').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!domain || !username || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Save to storage
    const data = {};
    data[domain] = { username, password };
    
    chrome.storage.local.set(data, function() {
      alert('Credentials saved!');
      document.getElementById('domain').value = '';
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      loadSavedDomains();
    });
  });
  
  // Load saved domains on popup open
  loadSavedDomains();
  
  function loadSavedDomains() {
    const domainsList = document.getElementById('domainsList');
    domainsList.innerHTML = '';
    
    chrome.storage.local.get(null, function(items) {
      if (Object.keys(items).length === 0) {
        domainsList.innerHTML = '<p>No domains saved yet</p>';
        return;
      }
      
      for (const domain in items) {
        const div = document.createElement('div');
        div.className = 'domain-item';
        
        const domainText = document.createElement('span');
        domainText.textContent = `${domain} (${items[domain].username})`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', function() {
          chrome.storage.local.remove(domain, function() {
            loadSavedDomains();
          });
        });
        
        div.appendChild(domainText);
        div.appendChild(deleteBtn);
        domainsList.appendChild(div);
      }
    });
  }
});
