export default class Report {
    _id: string | undefined;
    name: string | undefined;
    description: string | undefined;
}

export class ReportDetail {
    _id: string | undefined;
    reportName: string | undefined;
    from: Date | undefined ;
    to: Date | undefined ;
    type: string | undefined; 
}
