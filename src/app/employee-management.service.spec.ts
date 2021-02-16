import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeManagementService } from './employee-management.service';
import { HttpClient} from '@angular/common/http'

describe('EmployeeManagementService', () => {
  let service: EmployeeManagementService;
  let httpMock: HttpTestingController;
  let baseUrl = 'https://device-management-a17b0-default-rtdb.firebaseio.com/Employees.json'
  let baseUrlID = 'https://device-management-a17b0-default-rtdb.firebaseio.com/Employees/testid.json'
  let HttpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(EmployeeManagementService);
    httpMock = TestBed.get(HttpTestingController);
    // httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('getEmployees should call http Get method', () => {
    service.getEmployees()
    const request = httpMock.expectOne(baseUrl)

    expect(request.request.method).toEqual("GET");
    httpMock.verify()
  })

  it ('addEmployee should call http Post method', () => {
    let form = {
      name: 'Chara',
      email: 'Niouraki'
    }

    service.addEmployee(form)
    const request = httpMock.expectOne(baseUrl)

    expect(request.request.method).toEqual("POST");
    request.flush(form)
    httpMock.verify()
  })
});
