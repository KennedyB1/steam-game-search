// Import axios using ES module syntax
import axios from 'axios';

module.exports = async (req, res) => {
    try {
        const response = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
        const limitedApps = response.data.applist.apps.slice(0, 100); // Limit to first 100 apps
        res.status(200).json({ applist: { apps: limitedApps } });
    } catch (error) {
        console.error('Serverless Function Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

