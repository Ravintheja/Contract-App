const request = require('supertest');

// <==================== View Contract API ====================>

test('View Contract API - Test 1', async () => {
    const response = await request('http://localhost:3001').get('/contracts/1?profileId=1').set('profile_id', '1');
    expect(response.status).toBe(200);
});

test('View Contract API - Test 2', async () => {
    const response = await request('http://localhost:3001').get('/contracts/1').set('profile_id', '2');;
    expect(response.status).toBe(404);
});

// // <==================== View All Contracts API ====================>

test('View All Contracts API - Test 1', async () => {
    const response = await request('http://localhost:3001').get('/contracts').set('profile_id', '2');
    expect(response.status).toBe(200);
});

test('View All Contracts API - Test 3', async () => {
    const response = await request('http://localhost:3001').get('/contracts').set('profile_id', '5');
    expect(response.status).toBe(404);
});

// // <==================== View Unpaid Jobs API ====================>

test('View Unpaid Jobs API - Test 1', async () => {
    const response = await request('http://localhost:3001').get('/jobs/unpaid').set('profile_id', '2');
    expect(response.status).toBe(200);
});

test('View Unpaid Jobs API - Test 2', async () => {
    const response = await request('http://localhost:3001').get('/jobs/unpaid');
    expect(response.status).toBe(401);
});

test('View Unpaid Jobs API - Test 3', async () => {
    const response = await request('http://localhost:3001').get('/jobs/unpaid').set('profile_id', '3');
    expect(response.status).toBe(404);
});

// // <==================== Pay For Job API ====================>

test('Pay For Job API - Test 1', async () => {
    const response = await request('http://localhost:3001').post('/jobs/1/pay').set('profile_id', '1');
    expect(response.status).toBe(200);
});

test('Pay For Job API - Test 2', async () => {
    const response = await request('http://localhost:3001').post('/jobs/3/pay').set('profile_id', '1');
    expect(response.status).toBe(400);
});

// // <==================== Deposit For Client API ====================>

test('Deposit For Client API - Test 1', async () => {
    const response = await request('http://localhost:3001').post('/balances/deposit/1?amount=10').set('profile_id', '1');
    expect(response.status).toBe(200);
});

test('Deposit For Client API - Test 2', async () => {
    const response = await request('http://localhost:3001').post('/balances/deposit/1?amount=300').set('profile_id', '1');
    expect(response.status).toBe(400);
});

test('Deposit For Client API - Test 3', async () => {
    const response = await request('http://localhost:3001').post('/balances/deposit/1').set('profile_id', '1');
    expect(response.status).toBe(400);
});

// // <==================== Best Profession API ====================>

test('Best Profession API - Test 1', async () => {
    const response = await request('http://localhost:3001').get('/admin/best-profession?start=2020-08-01&end=2020-08-31').set('profile_id', '1');
    expect(response.status).toBe(200);
});

test('Best Profession API - Test 2', async () => {
    const response = await request('http://localhost:3001').get('/admin/best-profession?start=2020-08-01').set('profile_id', '1');
    expect(response.status).toBe(400);
});

// // <==================== Best Client API ====================>

test('Best Client API - Test 1', async () => {
    const response = await request('http://localhost:3001').get('/admin/best-clients?start=2020-08-01&end=2020-08-31&limit=3').set('profile_id', '1');
    expect(response.status).toBe(200);
});

test('Best Client API - Test 2', async () => {
    const response = await request('http://localhost:3001').get('/admin/best-clients?start=2020-08-01&end=2020-08-31').set('profile_id', '1');
    expect(response.status).toBe(200);
});

test('Best Client API - Test 3', async () => {
    const response = await request('http://localhost:3001').get('/admin/best-clients?start=2020-08-01&limit=3').set('profile_id', '1');
    expect(response.status).toBe(400);
});