export default class Report {
    _id!: string;
    name!: string;
    description!: string;
}

export class ReportDetail {
    _id!: string;
    reportName!: string;
    from!: Date;
    to!: Date;
    type!: string; 
}
