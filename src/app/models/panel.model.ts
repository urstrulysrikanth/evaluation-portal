export default class Panel {
    _id: string |undefined;
    candidateId: string | undefined;
    candidateName: string | undefined;

    panelDate: Date | undefined;
    panelTimeZone: string | undefined;
    timeAndDate: Date | undefined;

    trAssociate: Associate;
    mrAssociate: Associate;

    trEmployeeId !: number;
    trMobile!: number;
    trEmailId!: string;
    trName!: string;

    mrEmployeeId!: number;
    mrMobile!: number;
    mrEmailId!: string;  
    mrName!: string;

    createdBy: string | undefined;
    createdDate: Date | undefined;
    updatedBy: string | undefined;
    updatedDate: Date | undefined;

    constructor(data : any) {
        this.trAssociate = new Associate(data.trEmployeeId, data.trEmailId, data.trName, data.trMobile);
        this.mrAssociate = new Associate(data.mrEmployeeId, data.mrEmailId, data.mrName, data.mrMobile);
    }
}

export class Associate {
    employeeId: number | undefined;
    emailId: string | undefined;
    name: string | undefined;
    mobile: number | undefined;

    constructor(employeeId: number, emailId: string, name: string, mobile: number) {
        this.name = name,
            this.employeeId = employeeId,
            this.emailId = emailId,
            this.mobile = mobile

    }
}