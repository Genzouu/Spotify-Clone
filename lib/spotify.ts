import SpotifyWebApi from "spotify-web-api-node";

const scopes: string = [
   "user-read-email",
   "playlist-read-private",
   "playlist-read-collaborative",
   "user-read-email",
   "streaming",
   "user-read-private",
   "user-library-read",
   "user-top-read",
   // "user-library-modify"
   "user-read-playback-state",
   "user-modify-playback-state",
   "user-read-currently-playing",
   "user-read-recently-played",
   "user-follow-read",
].join(',');

const params: { scope: string } = {
   scope: scopes,
};

const queryParamString: string = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyAPI = new SpotifyWebApi({
   clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
   clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyAPI;

export { LOGIN_URL };