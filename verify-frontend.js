#!/usr/bin/env node

const http = require('http');

async function fetchPage() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:5173/', (res) => {
      let html = '';
      res.on('data', (chunk) => { html += chunk; });
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('🌐 Verifying Frontend Application\n');

  try {
    const html = await fetchPage();

    const checks = [
      {
        name: 'React Root Element',
        test: () => html.includes('id="root"'),
      },
      {
        name: 'Application Title',
        test: () => html.includes('Cybersecurity Career Tracker'),
      },
      {
        name: 'Vite Dev Server',
        test: () => html.includes('/@vite/client'),
      },
      {
        name: 'Main Script Bundle',
        test: () => html.includes('/src/main.tsx'),
      },
      {
        name: 'React Refresh',
        test: () => html.includes('/@react-refresh'),
      },
      {
        name: 'HTML Structure',
        test: () => html.includes('<html') && html.includes('</html>'),
      }
    ];

    let passed = 0;
    let failed = 0;

    for (const check of checks) {
      if (check.test()) {
        console.log(`✅ ${check.name}`);
        passed++;
      } else {
        console.log(`❌ ${check.name}`);
        failed++;
      }
    }

    console.log(`\n📊 Frontend Verification: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log('✨ Frontend is properly configured and ready for use');
      return true;
    }
    return false;
  } catch (err) {
    console.error('❌ Error verifying frontend:', err.message);
    return false;
  }
}

verify().then(success => {
  process.exit(success ? 0 : 1);
});
