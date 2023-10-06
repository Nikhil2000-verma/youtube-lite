import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Spinner from "../Components/Spinner";
import { clearVideos } from "../Store";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { HomePageVideos } from "../Types";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../Store/reducers/getSearchPageVideos";
import SearchCard from "../Components/SearchCard";

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className='max-h-screen overflow-hidden'>
      <div className='' style={{ height: "56px" }}>
        <Navbar></Navbar>
      </div>
      <div className='flex' style={{ height: "92.5vh" }}>
        <Sidebar></Sidebar>
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner></Spinner>}
              height={650}
            >
              {videos.map((item: HomePageVideos) => {
                 return (
                 <div className='my-5'>
                 <SearchCard data={item} key={item.videoId}></SearchCard>
                 </div>
                 )
                 
                })}
             
            </InfiniteScroll> </div>) : <Spinner></Spinner>}
      </div>
    </div>
  );
}