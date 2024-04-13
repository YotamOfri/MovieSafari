import { useContext } from "react";
import { WebsiteContext } from "../../context/WebsiteContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModernDisplay from "@/components/Bookmarks/ModernDisplay";
export default function Bookmarks() {
  const { user } = useContext(WebsiteContext);
  const bookmarksModern = user?.modern.bookmarks;
  const bookmarksAnime = user?.anime.bookmarks;
  return (
    <div className="w-full justify-center flex">
      <Tabs
        defaultValue="modern"
        className="flex justify-center items-center flex-col w-full"
      >
        <TabsList className="w-fit flex justify-center">
          <TabsTrigger value="modern">Modern</TabsTrigger>
          <TabsTrigger value="anime">Anime</TabsTrigger>
        </TabsList>
        <TabsContent value="modern" className="w-full flex flex-col gap-20">
          <ModernDisplay bookmarks={bookmarksModern}></ModernDisplay>
        </TabsContent>
        <TabsContent value="anime">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
