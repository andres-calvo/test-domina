import BaseService from "./base.service";
export interface ISendIndentification {
  identification: string;
}
export interface IValidate extends ISendIndentification {
  image: string;
  otpCode: string;
}
class SignService extends BaseService {
  constructor() {
    super();
  }
  sendIdentification(data: ISendIndentification) {
    return this.http.post("/ext/sign", data);
  }
  validate(data: IValidate) {
    return this.http.post("/ext/sign/validate", data);
  }
}
export default SignService;
