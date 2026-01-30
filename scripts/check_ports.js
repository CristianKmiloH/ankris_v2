const axios = require('axios');

async function checkHealth() {
    try {
        const res = await axios.get('http://localhost:3000/health');
        console.log('Backend Health:', res.data);
    } catch (e) { console.log('Backend Health: FAIL', e.message); }

    try {
        const res = await axios.get('http://localhost:5173');
        console.log('Frontend Health: OK (Status ' + res.status + ')');
    } catch (e) { console.log('Frontend Health: FAIL', e.message); }
}
checkHealth();
