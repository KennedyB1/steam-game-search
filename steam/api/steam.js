import axios from 'axios';

export default async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm.toLowerCase();
        const response = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
        const filteredApps = response.data.applist.apps.filter(app =>
            app.name.toLowerCase().includes(searchTerm)
        ).slice(0, 100); // Limit to 100 results for performance

        res.status(200).json({ applist: { apps: filteredApps } });
    } catch (error) {
        console.error('Serverless Function Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
