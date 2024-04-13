import { WebsiteContext } from "@/context/WebsiteContext";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import HandleBookMark from "../../hooks/user/actions/HandleBookMark";
import { toast } from "sonner";
import PropTypes from "prop-types";
export default function BookmarkBtn({ className, id, type }) {
  const { user, refreshUserInfo } = useContext(WebsiteContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    setIsBookmarked(
      user?.modern.bookmarks?.some(
        (bookmark) => bookmark.itemId.toString() === id.toString()
      )
    );
  }, [user?.modern.bookmarks, id]);
  const {
    mutate: bookmark,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: HandleBookMark,
  });
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (isBookmarked)
      bookmark({
        item: { itemId: id, itemType: type },
        type: "modern",
        action: "remove",
      });
    else
      bookmark({
        item: { itemId: id, itemType: type },
        type: "modern",
        action: "add",
      });
  };
  useEffect(() => {
    if (isSuccess) {
      toast("Bookmark updated");
      refreshUserInfo();
    }

    if (error) {
      toast("An error occurred, please try again later", "error");
      setIsBookmarked(!isBookmarked);
    }
  }, [isSuccess, error]);
  return (
    <div>
      {isBookmarked ? (
        <BookmarkCheck onClick={handleBookmark} className={className} />
      ) : (
        <Bookmark onClick={handleBookmark} className={className} />
      )}
    </div>
  );
}
BookmarkBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
};
