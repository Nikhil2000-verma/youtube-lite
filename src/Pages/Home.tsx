import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useAppDispatch, useAppSelector } from '../Store/hooks'
import { getHomePageVideos } from '../Store/reducers/getHomePageVideos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Components/Spinner';
import { HomePageVideos } from '../Types';
import Card from '../Components/Card';
import { clearVideos } from '../Store';

export default function Home() {

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  
  useEffect(() => {
    return() => {
      dispatch(clearVideos())
    }
  }, [dispatch])
  
  
  useEffect(() => {
    dispatch(getHomePageVideos(false));
   console.log(videos)
   }, [dispatch]);

  return (
    <div className='max-h-screen overflow-hidden'>
      <div className='' style={{ height: "56px" }}>
        <Navbar></Navbar>
      </div>
      <div className='flex' style={{height: "92.5vh"}}>
        <Sidebar></Sidebar>
        {videos.length ? <InfiniteScroll
        dataLength={videos.length}
        next={() => dispatch(getHomePageVideos(true))}
        hasMore={videos.length < 500}
        loader={<Spinner></Spinner>}
        height={650}
        >
        <div className='grid gap-y-14 gap-x-6 grid-cols-4 p-8'>
          {videos.map((item: HomePageVideos) => {
            return <Card data={item} key={item.videoId}></Card>
          })}
        </div>
        </InfiniteScroll> : <Spinner></Spinner>}
      </div>
    </div>

  )
}
