import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Result} from './result';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
/**
 * 用户服务
 * @author wildhunt_unique
 */
export class UserService {
  // user
  userUrl: String;

  userParam: User;


  /**
   * 得到当前登录的用户的信息 (测试完成)
   * @returns {Observable<User>}
   * 调用此方法的结构如下：
   * this.userService.getLoginUser().subscribe((data: User) => this.loginUser = data);
   */
  getLoginUser(): Observable<User> {
    return this.http.post<User>(this.userUrl + `fetchLoginInfo`, this.userParam, httpOptions);
  }

  /**
   * 进行登陆操作 (测试完成)
   * @param {User} user 要登录的用户信息, phoneNum 和 password 字段必须有值， 用这两个值进行登录验证
   * @returns {Observable<Result>}
   this.userService.login({
      phoneNum: '10086',
      password: '10086',
      username: null,
      userId: null,
      avator: null
    }).subscribe((data: Result) => this.result = data);
   */
  login(user: User): Observable<Result> {
    return this.http.post<Result>(this.userUrl + `loginWithAngular`, user, httpOptions);
  }

  /**
   * 注册用户
   * @param {User} user
   * @returns {Observable<Result>}
   */
  register(user: User): Observable<Result> {
    return this.http.post<Result>(this.userUrl + `registerWithAngular`, user, httpOptions);
  }

  /**
   * 验证手机号是否已经被使用过
   * @param {String} phoneNum 需要验证的手机号码
   * @returns {Observable<Result>}
   */
  exitPhoneNum(phoneNum: String): Observable<Result> {
    return this.http.post<Result>(this.userUrl + `exitPhoneNumWithAngular`, phoneNum, httpOptions);
  }

  /**
   * 手机发送验证码 (测试完成)
   * @param {String} phoneNum 被发送验证码的手机号
   * @returns {Observable<Result>}
   */
  sendVerifyCode(phoneNum: String): Observable<Result> {
    return this.http.post<Result>(this.userUrl + `sendVerifyCodeWithAngular`, phoneNum, httpOptions);
  }

  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.userUrl = 'user/';
    // this.userUrl = 'http://localhost:80/user/';
  }
}
