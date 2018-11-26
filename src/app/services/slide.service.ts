import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Slide } from './slide';
import { Result } from './result';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
/**
 * 幻灯片的服务
 * @author wildunt_unique
 */
export class SlideService {
  /**
   * 幻灯片服务的baseUrl
   */
  folderUrl: String;

  /**
   * 添加一个新的幻灯片， 返回slide，即被添加的幻灯片对象
   * @returns {Observable<Slide>}
   */
  addNewSlide(folderId: number): Observable<Slide> {
    return this.http.get<Slide>(this.folderUrl + `saveWithAngular?folderId=` + folderId, httpOptions);
  }

  /**s
   * 修改幻灯片信息
   * @param {Result} slide
   * @returns {Observable<Slide>}
   */
  modifySlideInfo(slide: Slide): Observable<Result> {
    return this.http.post<Result>(this.folderUrl + `modifySlideInfoWithAngular`, slide, httpOptions);
  }

  /**
   * 删除幻灯片
   * @param {number} slideId
   * @returns {Observable<Slide>}
   */
  delelteSlideInfo(slideId: number): Observable<Result> {
    return this.http.get<Result>(this.folderUrl + `delSlide?slideId=` + slideId, httpOptions);
  }

  /**
   * 通过幻灯片的名字模糊查询
   * @param slide
   */
  findByName(slide: Slide): Observable<Slide[]> {
    // console.log('通过幻灯片的名字模糊查询' + slide);
    return this.http.post<Slide[]>(this.folderUrl + `findByNameWithAngular`, slide, httpOptions);
  }

  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.folderUrl = 'slide/';
  }
}
