export class Engagement {
    id: number | undefined;
    name: string | undefined;
    skillSet: string | undefined;
    experience: number | undefined;
    numberOfPositions: number | undefined;
    location: string | undefined;
    closeBy: Date | undefined;
    createdBy: string | undefined;
}

export class Panel {
    id: number | undefined;
    candidateId: string | undefined;
    candidateName: string | undefined;

    panelDate: Date | undefined;
    panelTimeZone: string | undefined;
    timeAndDate: Date | undefined;

    trAssociate: Associate;
    mrAssociate: Associate;

    constructor() {
        this.trAssociate = new Associate();
        this.mrAssociate = new Associate();
    }
}

export class Associate {
    employeeId: number | undefined;
    emailId: string | undefined;
    name: string | undefined;
    mobile: number | undefined;
}