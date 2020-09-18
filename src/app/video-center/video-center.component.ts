import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from "../video.service";
import { FormGroup,FormControl } from '@angular/forms'

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>
  selectedVideo: Video;
  hidenewVideo: boolean = true;

  createVideo = new FormGroup({
    title: new FormControl(''),
    url: new FormControl('') ,
    description: new FormControl(''),
  })
  

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    console.log(this.createVideo.value)
    this.videoService.getVideos()
    .subscribe((resVideoData) => {
      this.videos = resVideoData;
    })
  }

  onSelectVideo(video:any){
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(){
    console.log("clicked");
    console.log(this.createVideo.value)
    this.videoService.addVideo(this.createVideo.value)
    .subscribe((resNewVideo) =>{
      this.videos.push(resNewVideo);
      this.hidenewVideo = true;
      this.selectedVideo = resNewVideo;
      this.createVideo.reset({});
    })
  }

  onUpdateVideoEvent(video: any){
    this.videoService.updateVideo(video)
    .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  };

  onDeleteVideoEvent(video: any){
    let videoArray = this.videos;
    this.videoService.deleteVideo(video)
    .subscribe(resDeletedVideo => {
      for(let i=0; i < videoArray.length; i++){
        if(videoArray[i]._id === video._id){
          videoArray.splice(i,1);
        }
      }
    });
    this.selectedVideo = null;
  };

  newVideo(){
    this.hidenewVideo = false;
  }
}
