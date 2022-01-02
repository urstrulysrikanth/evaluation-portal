export default class Panel {
    id!: number;
    panelId!: string;
    candidateId!: string;
    candidateName!: string;

    panelDate!: Date;
    panelTimeZone!: string;
    timeAndDate!: Date;

    trAssociate!: Associate;
    mrAssociate!: Associate;

    selectedTr!: string;
    selectedMr!: string;
    // trEmployeeId !: number;
    // trMobile!: number;
    // trEmailId!: string;
    // trName!: string;

    // mrEmployeeId!: number;
    // mrMobile!: number;
    // mrEmailId!: string;
    // mrName!: string;

    createdBy!: string;
    createdDate!: Date;
    updatedBy!: string;
    updatedDate!: Date;

    // constructor(data: any) {
    //     this.trAssociate = new Associate(data.trEmployeeId, data.trEmailId, data.trName, data.trMobile);
    //     this.mrAssociate = new Associate(data.mrEmployeeId, data.mrEmailId, data.mrName, data.mrMobile);
    // }
    constructor() {
        this.trAssociate = new Associate();
        this.mrAssociate = new Associate();
    }
}

export class Associate {
    employeeId!: number;
    tcsEmailId!: string;
    clientEmailId!: string;
    name!: string;
    mobile!: number;

    // constructor(employeeId: number, emailId: string, name: string, mobile: number) {
    //         this.name = name,
    //         this.employeeId = employeeId,
    //         this.emailId = emailId,
    //         this.mobile = mobile
    // }

    constructor() {
    }
}