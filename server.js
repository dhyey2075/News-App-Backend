const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const { page = 1, category = 'general' } = req.query;
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=6&page=${page}&category=${category}&apiKey=1e778d7882ff40c0af09a9a08f21d699`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})