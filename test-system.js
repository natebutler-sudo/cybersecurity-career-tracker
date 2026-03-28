#!/usr/bin/env node

const http = require('http');
const url = require('url');

function makeRequest(urlString) {
  return new Promise((resolve, reject) => {
    const reqUrl = new url.URL(urlString);
    const options = {
      hostname: reqUrl.hostname,
      port: reqUrl.port,
      path: reqUrl.pathname + reqUrl.search,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            contentType: res.headers['content-type'],
            data: res.headers['content-type']?.includes('json') ? JSON.parse(data) : data
          });
        } catch {
          resolve({ status: res.statusCode, contentType: res.headers['content-type'], data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Cybersecurity Career Tracker System\n');

  const tests = [
    {
      name: 'Backend Health Check',
      url: 'http://localhost:3001/health',
      validate: (r) => r.status === 200 && r.data?.success === true
    },
    {
      name: 'API - Get All Roles',
      url: 'http://localhost:3001/api/v1/roles',
      validate: (r) => r.status === 200 && Array.isArray(r.data?.data) && r.data.data.length === 24
    },
    {
      name: 'API - Get Role by Title',
      url: 'http://localhost:3001/api/v1/roles/Cloud%20Security%20Engineer',
      validate: (r) => r.status === 200 && r.data?.data?.title
    },
    {
      name: 'API - Get All Skills',
      url: 'http://localhost:3001/api/v1/skills',
      validate: (r) => r.status === 200 && Array.isArray(r.data?.data) && r.data.data.length > 0
    },
    {
      name: 'API - Get All Certifications',
      url: 'http://localhost:3001/api/v1/certifications',
      validate: (r) => r.status === 200 && Array.isArray(r.data?.data) && r.data.data.length > 0
    },
    {
      name: 'Frontend - Page Load',
      url: 'http://localhost:5173/',
      validate: (r) => r.status === 200 && r.contentType?.includes('text/html')
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await makeRequest(test.url);
      const isValid = test.validate(result);

      if (isValid) {
        console.log(`✅ ${test.name}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}`);
        console.log(`   Status: ${result.status}, Type: ${result.contentType}`);
        console.log(`   Response: ${JSON.stringify(result.data).substring(0, 100)}`);
        failed++;
      }
    } catch (err) {
      console.log(`❌ ${test.name} - ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failed === 0) {
    console.log('🎉 All tests passed! System is ready for deployment.');
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(console.error);
