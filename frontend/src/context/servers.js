export default function servers(type, info) {
  const tv = [
    `https://vidsrc.cc/v2/embed/tv/${info[0]}/${info[1]}/${info[2]}`,
    `https://vidsrc.icu/embed/tv/${info[0]}/${info[1]}/${info[2]}`,
    `https://multiembed.mov/directstream.php?video_id=${info[0]}&tmdb=1&s=${info[1]}&e=${info[2]}`,
    `https://vidsrc.me/embed/tv?tmdb=${info[0]}&season=${info[1]}&episode=${info[2]}`,
  ];
  const movie = [
    `https://vidsrc.cc/v2/embed/movie/${info[0]}`,
    `https://vidsrc.icu/embed/movie/${info[0]}`,
    `https://multiembed.mov/?video_id=${info[0]}&tmdb=1$`,
    `https://vidsrc.me/embed/movie?tmdb=${info[0]}`,
  ];
  const servers = type === "tv" ? tv : movie;
  return servers;
}
