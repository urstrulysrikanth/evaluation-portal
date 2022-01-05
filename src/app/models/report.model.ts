export class ReportFilter {
    name!: string;
    from!: Date;
    to!: Date;
}

export class Report {
    reportLabels !: string[];
    reportData!: ReportData[];
}

export class ReportData {
    data!: any[];
    label!: string;
}