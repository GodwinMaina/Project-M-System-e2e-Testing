import { TestBed } from '@angular/core/testing';
import { AuthServicesService } from '../auth-services.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
// import { users } from '../interfaces/user.inteface';
import { expectedUsers } from '../testData/user';

describe('ApiService', () => {
  let service: AuthServicesService;
  let testingController : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AuthServicesService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Test register User
  it('registers a user', ()=>{
    let mockUser ={
      userName:"Godwin",
      email: "godwin@gmail.com",
      password: "123456"
    }

    service.signUpUser(mockUser).subscribe(res=>{
      expect(res.message).toEqual('Account created successfully')
    })

    const mockReq = testingController.expectOne('http://localhost:3100/signup')
    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toBe(mockUser)
    mockReq.flush({"message": "Account created successfully"})
  })


  //Test log in user
  it('logs in a user',()=>{
    let mockLogin ={
      email:"compgodwin@gmail.com",
      password:'123456'
    }
    service.loginUser(mockLogin).subscribe((res:any)=>{
      expect(res).toBeTruthy()
expect(res.message).toEqual("Logged in successfully")
    })
    const mockRequest = testingController.expectOne('http://localhost:3100/auth/login')
expect(mockRequest.request.method).toEqual('POST')
expect(mockRequest.request.body).toBe(mockLogin)
mockRequest.flush({"message":"Logged in successfully"})
  })

//Test get one user by user_id
  // it('gets user by Id', ()=>{
  //   let id = '206ff9b5-5413-4f20-b343-501285fcf0a3'
  //   service.getOneUserDetails(id).subscribe((user:any)=>{
  //     expect(user).toBeTruthy()
  //     expect(user.name).toBeTruthy('Godwin')
  //   })

  //   const mockReq = testingController.expectOne(`http:localhost:3100/user/${user_id}`)
  //   mockReq.flush(expectedUsers[0])
  //   expect(mockReq.request.method).toBe('GET')
  // })

});
