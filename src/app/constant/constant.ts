import { environment } from "src/environments/environment";

export class Constant {
    public static loginUrl: string = `${environment._url}/lab-auth`;
    public static signUrl: string = `${environment._url}/lab-signup`;
    public static imgUrl: string = `${environment._url}/image`;
    public static forgotPasswordUrl: string = `${environment._url}/lab-auth`;
    public static labRequestUrl: string = `${environment._url}/lab-request`;
    public static insuranceListUrl: string = `${environment._url}/lab-settings`;
    public static labReportUrl: string = `${environment._url}/lab-report`;
    public static eClaimUrl: string = `${environment._url}/lab-claim`;
    public static labTestUrl: string = `${environment._url}/lab-test`;
    public static paymentUrl: string = `${environment._url}/lab-payment`;
    public static profileDetailUrl: string = `${environment._url}/lab-profile`;
    public static userCurrentBalance: string = `${environment._url}/user-lab-test`;
    public static sendOtp: string = `${environment._url}/user-lab-test`;
}

export class staticRoutes{
    public static register: string = 'create-account/:data';
    public static login: string = 'log-in';
    public static signup: string = 'sign-up';
    public static resetPassword: string =  'reset-password/:token/:email';
    public static dashboard: string = `dashboard`;
    public static request: string = 'image-request';
    public static report: string = 'image-reports';
    public static eClaim: string = 'e-claims';
    public static test: string = 'image-tests';
    public static payment: string = 'payments';
    public static profile: string = 'profile';
    public static webMangement: string = 'web-managment';
    public static pageMangement: string = 'page-managment';
    public static validate: string = 'validate';
}

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};
