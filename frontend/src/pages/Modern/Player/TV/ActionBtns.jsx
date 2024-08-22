import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import PropTypes from "prop-types";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { updateUrlParams } from "../../../../utils";
import BookmarkBtn from "@/components/Inputs/Bookmark";
import { useContext, useEffect, useState } from "react";
import { WebsiteContext } from "@/context/WebsiteContext";
export default function ActionBtns({
  data,
  setInformationObject,
  informationObject,
}) {
  const { user } = useContext(WebsiteContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  // const episodeRunTime = Math.min(
  //   data.episodes[informationObject.episode - 1]?.runtime || 0,
  //   10
  // );

  useEffect(() => {
    if (user)
      setIsBookmarked(
        user?.modern.bookmarks?.some(
          (bookmark) =>
            bookmark.itemId.toString() === informationObject.id.toString()
        )
      );
  }, [user, informationObject]);
  const hasMoreEpisodes =
    informationObject.episode <
    data.seasons[informationObject.season].episode_count;
  const hasPreviousEpisodes = informationObject.episode > 1;

  const handleEpisodeClick = (delta) => {
    const newEpisode = informationObject.episode + delta;
    updateUrlParams(
      `/tv/player/${informationObject.id}&season=${informationObject.season}&episode=${newEpisode}`
    );
    setInformationObject((prev) => ({ ...prev, episode: newEpisode }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="flex gap-2">
      <HoverCard>
        <HoverCardTrigger>
          <button
            onClick={() => handleEpisodeClick(-1)}
            className={`px-2 rounded-xl border flex justify-center items-center  ${
              !hasPreviousEpisodes ? "bg-gray-800" : "bg-NiceBlack"
            }`}
            disabled={!hasPreviousEpisodes}
          >
            <ArrowLeft className="w-4 h-4" />
            Prev
          </button>
        </HoverCardTrigger>
        <HoverCardContent>
          {hasPreviousEpisodes
            ? `Go to the previous episode (${informationObject.episode - 1})`
            : "First Episode"}
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <button
            onClick={() => handleEpisodeClick(1)}
            className={`px-2 rounded-xl border flex justify-center items-center  ${
              !hasMoreEpisodes ? "bg-gray-800" : "bg-NiceBlack"
            }`}
            disabled={!hasMoreEpisodes}
          >
            <ArrowRight className="w-4 h-4" />
            Next
          </button>
        </HoverCardTrigger>
        <HoverCardContent>
          {hasMoreEpisodes
            ? `Go to the Next episode (${informationObject.episode + 1})`
            : "Last Episode"}
        </HoverCardContent>
      </HoverCard>
      {user && (
        <HoverCard>
          <HoverCardTrigger>
            <div
              className={`px-2 rounded-xl border flex justify-center items-center bg-NiceBlack cursor-pointer gap-2`}
            >
              <BookmarkBtn
                type="tv"
                id={informationObject.id}
                className="w-4 h-4 flex"
              >
                Bookmark
              </BookmarkBtn>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            {isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
}

ActionBtns.propTypes = {
  data: PropTypes.object,
  setInformationObject: PropTypes.func,
  informationObject: PropTypes.object,
};
