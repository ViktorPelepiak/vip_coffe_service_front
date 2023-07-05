export class CustomResponse {
  result: any;
  success: boolean;
  message: string;
  resultCode: number;
  // additionalInformation: Map<string, string>;
  additionalInformation: any;


  // constructor(result: any, success: boolean, message: string, resultCode: number, additionalInformation: Map<string, string>) {
  constructor(result: any, success: boolean, message: string, resultCode: number, additionalInformation: any) {
    this.result = result;
    this.success = success;
    this.message = message;
    this.resultCode = resultCode;
    this.additionalInformation = additionalInformation;
  }
}
