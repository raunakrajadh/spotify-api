# To Setup
```
npm install express express-session axios ejs dotenv fs-extra node-fetch
```

# Config
```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=
SESSION_SECRET=your_session_secret
DOWNLOAD_DIR=downloads
```

# FOR SPOTIFY_REDIRECT_URI

Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications). <br>
Create a new application or select an existing one. <br>
Set the Redirect URI to `http://localhost:3000/callback`. <br>
Update Your .env File: <br>

# In Config
Set `SPOTIFY_REDIRECT_URI` to `http://localhost:3000/callback`. <br>
Get `SPOTIFY_CLIENT_ID` from appliation settings. <br>
Get `SPOTIFY_CLIENT_SECRET` from application settings. <br>

# To Run the Application
Start your server by running `node server/app.js` and navigate to `http://localhost:3000` in your  <br>
browser. You will be prompted to log in with Spotify, search for songs, and perform actions like  <br>
downloading and deleting music. <br>
