// Import axios using ES module syntax
import axios from 'axios';

export default async (req, res) => {
    try {
        const response = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Serverless Function Error:', error);
        res.status(500).json({ message: error.message });
    }
};
