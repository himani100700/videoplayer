import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Video } from './video';
// import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class VideoService {
  vidID: any;
  private getUrl: string = "/api/videos";
  private postUrl: string = "/api/video";
  private putUrl: string = "/api/video/";
  private deleteUrl: string = "/api/video/";

  constructor(private http: HttpClient) { }

  getVideos(): Observable<any>{
    return this.http.get<any>(this.getUrl);
    // .map((response: Response) => response.json() );
  }

  // addVideo(video: Video) {
  //   let headers = new Headers({ 'Content-Type': 'application/json'});
  //   let options = {headers: headers};
  //   return this.http.post(this.postUrl, JSON.stringify(video));
  // }

  addVideo(video: Video):Observable<any>{
    return this.http.post<any>(this.postUrl,video);
  }

  updateVideo(video: Video):Observable<any>{
    return this.http.put(this.putUrl + video._id  , video);
  }

  deleteVideo(video: Video){
    return this.http.delete(this.deleteUrl + video._id);
  }

} 
