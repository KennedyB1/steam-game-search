// api/steam.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
        console.log(response.data);  // Log the response data
        res.status(200).json(response.data);
        console.log('123')

    } catch (error) {
        res.status(500).send('Error occurred');
        console.log('123')
    }
};
