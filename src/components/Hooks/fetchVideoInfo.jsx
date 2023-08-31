import { useEffect } from "react";
export function GetaspectRatioVid(setVideoAspect, videoId) {
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=YOUR_YOUTUBE_API_KEY&part=snippet`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const aspectRatio = data.items[0].snippet.aspectRatio; // Calculate aspect ratio
          setVideoAspect(aspectRatio);
        }
      } catch (error) {
        console.error("Error fetching video information:", error);
      }
    };

    fetchVideoInfo();
  }, [videoId]);
}
