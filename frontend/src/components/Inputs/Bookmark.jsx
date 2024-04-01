import { WebsiteContext } from "@/context/WebsiteContext";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useContext, useState } from "react";
export default function BookmarkBtn({ className, id }) {
  const { user } = useContext(WebsiteContext);
  const [isBookmarked, setIsBookmarked] = useState(
    user?.modern.bookmarks?.includes(id)
  );
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
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
