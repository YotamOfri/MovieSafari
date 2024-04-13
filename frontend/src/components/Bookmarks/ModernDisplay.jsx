import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { useQueries, useMutation } from "@tanstack/react-query";
import DetailsMovieUrl from "../../utils/DetailsMovieUrl";
import fetchByUrl from "@/hooks/fetchByUrl";
import Bookmark from "./Bookmark";
import HandleBookMark from "@/hooks/user/actions/HandleBookMark";
import { toast } from "sonner";
import { WebsiteContext } from "@/context/WebsiteContext";
export default function ModernDisplay({ bookmarks }) {
  const { refreshUserInfo } = useContext(WebsiteContext);
  const {
    mutate: bookmark,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: HandleBookMark,
  });

  // Function to remove a bookmark
  const removeBookmark = (id, type) => {
    bookmark({
      item: { itemId: id, itemType: type },
      type: "modern",
      action: "remove",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast("Bookmark updated");
      refreshUserInfo();
    }
    if (error) toast("An error occurred, please try again later", "error");
  }, [isSuccess, error]);

  // Function to fetch details for a single bookmark
  const fetchDetails = async ({ queryKey }) => {
    const [, { id, type }] = queryKey;
    const url = DetailsMovieUrl(id, type);
    return fetchByUrl(url);
  };

  // Generate queries for fetching details of all bookmarks
  const bookmarkQueries = useQueries({
    queries: bookmarks.map((bookmark) => ({
      queryKey: [
        "bookmarkDetails",
        { id: bookmark.itemId, type: bookmark.itemType },
      ],
      queryFn: fetchDetails,
    })),
  });

  // Check if any queries are still loading
  const isLoading = bookmarkQueries.some((query) => query.isLoading);

  return (
    <div className="w-full flex flex-col gap-3">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        bookmarkQueries.map((query, index) =>
          query.isError ? (
            <ErrorMessage key={index} message={query.error.message} />
          ) : (
            <BookmarkDetails
              key={index}
              query={query}
              bookmark={bookmarks[index]}
              onRemoveBookmark={removeBookmark}
            />
          )
        )
      )}
    </div>
  );
}

// Bookmark details component including the remove button
const BookmarkDetails = ({ query, bookmark, onRemoveBookmark }) => {
  const { data } = query;
  const title = bookmark.itemType === "movie" ? data?.title : data?.name;
  const subHeader =
    bookmark.itemType === "movie"
      ? `${data?.runtime} Min`
      : `${data?.number_of_seasons} ${
          data?.number_of_seasons === 1 ? "Season" : "Seasons"
        }`;
  const link = `/${bookmark.itemType}/${bookmark.itemId}`;

  const handleRemoveClick = () =>
    onRemoveBookmark(bookmark.itemId, bookmark.itemType);

  return (
    <Bookmark
      banner={data?.backdrop_path}
      title={title}
      type={bookmark.itemType}
      subHeader={subHeader}
      link={link}
      onRemove={handleRemoveClick} // Pass the remove function as a prop
    />
  );
};

// Loading state component
const LoadingIndicator = () => <div>Loading...</div>;

// Error message component
const ErrorMessage = ({ message }) => <div>Error: {message}</div>;

ModernDisplay.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

BookmarkDetails.propTypes = {
  query: PropTypes.object.isRequired,
  bookmark: PropTypes.object.isRequired,
  onRemoveBookmark: PropTypes.func.isRequired,
};
