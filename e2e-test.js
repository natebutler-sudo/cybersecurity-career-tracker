#!/usr/bin/env node

const { spawn } = require('child_process');

function runCurl(url) {
  return new Promise((resolve, reject) => {
    const curl = spawn('curl', ['-s', url]);
    let stdout = '';
    let stderr = '';

    curl.stdout.on('data', (data) => {
      stdout += data;
    });

    curl.stderr.on('data', (data) => {
      stderr += data;
    });

    curl.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(stderr || `Curl exited with code ${code}`));
      }
    });
  });
}

async function testAPI(endpoint, validator) {
  try {
    const response = await runCurl(`http://localhost:3001${endpoint}`);
    const data = JSON.parse(response);
    return validator(data);
  } catch {
    return false;
  }
}

async function testFrontend(path, validator) {
  try {
    const response = await runCurl(`http://localhost:5173${path}`);
    return validator(response);
  } catch {
    return false;
  }
}

async function runE2ETests() {
  console.log('🚀 End-to-End System Verification\n');
  console.log('═'.repeat(50) + '\n');

  const tests = [
    {
      category: 'Backend API',
      tests: [
        {
          name: 'Server Health',
          fn: () => testAPI('/health', (d) => d.success === true)
        },
        {
          name: 'Retrieve All Roles (24 expected)',
          fn: () => testAPI('/api/v1/roles', (d) => Array.isArray(d.data) && d.data.length === 24)
        },
        {
          name: 'Retrieve All Skills',
          fn: () => testAPI('/api/v1/skills', (d) => Array.isArray(d.data) && d.data.length > 0)
        },
        {
          name: 'Retrieve All Certifications',
          fn: () => testAPI('/api/v1/certifications', (d) => Array.isArray(d.data) && d.data.length > 0)
        },
        {
          name: 'Get Role by Title',
          fn: () => testAPI('/api/v1/roles/Cloud%20Security%20Engineer', (d) => d.data?.title === 'Cloud Security Engineer')
        }
      ]
    },
    {
      category: 'Frontend Application',
      tests: [
        {
          name: 'Frontend Loads',
          fn: () => testFrontend('/', (html) => html.includes('id="root"'))
        },
        {
          name: 'Vite Dev Server Active',
          fn: () => testFrontend('/', (html) => html.includes('/@vite/client'))
        },
        {
          name: 'React Application Bundle',
          fn: () => testFrontend('/', (html) => html.includes('/src/main.tsx'))
        }
      ]
    },
    {
      category: 'Application Integration',
      tests: [
        {
          name: 'API Endpoints Available',
          fn: () => testAPI('/api/v1/roles', (d) => d.success === true && d.data)
        },
        {
          name: 'Database Connected',
          fn: () => testAPI('/api/v1/skills', (d) => d.success === true && d.data.length > 0)
        }
      ]
    }
  ];

  let totalPassed = 0;
  let totalFailed = 0;

  for (const testGroup of tests) {
    console.log(`📋 ${testGroup.category}\n`);

    for (const test of testGroup.tests) {
      try {
        const passed = await test.fn();
        if (passed) {
          console.log(`  ✅ ${test.name}`);
          totalPassed++;
        } else {
          console.log(`  ❌ ${test.name}`);
          totalFailed++;
        }
      } catch (err) {
        console.log(`  ❌ ${test.name} - Error: ${err.message}`);
        totalFailed++;
      }
    }
    console.log();
  }

  console.log('═'.repeat(50) + '\n');
  console.log(`📊 Summary: ${totalPassed} passed, ${totalFailed} failed out of ${totalPassed + totalFailed} tests\n`);

  if (totalFailed === 0) {
    console.log('✨ ✨ ✨  ALL TESTS PASSED  ✨ ✨ ✨\n');
    console.log('🎉 Cybersecurity Career Tracker is ready for deployment!\n');
    console.log('Access URLs:');
    console.log('  Frontend: http://localhost:5173');
    console.log('  Backend:  http://localhost:3001/api/v1');
    console.log('  Database: postgresql://localhost:5432\n');
    return true;
  } else {
    console.log('⚠️  Some tests failed. Please review the output above.\n');
    return false;
  }
}

runE2ETests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
