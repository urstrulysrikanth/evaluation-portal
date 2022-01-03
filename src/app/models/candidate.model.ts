export default class Candidate {
    id!: number;
    candidateId!: string;
    details!: Details;
    source!: Source;

    constructor(details: Details, source: Source) {
        this.source = source;
        this.details = details;
    }
}


export class Details {
    _id!: string; // to be used in history table
    epNumber!: string;
    name!: string;
    mailId!: string;
    mobile!: number;
    skillSet!: string;
    location!: string;
    experience!: string;
    availability!: string;
    engagement!: string;
    status!: string;
    pendingSinceDays!: number;
    resumes!: string;
    eligibilityXls!: string;
    joiningDate!: Date;

    createdDate!: Date;
    createdBy!: string;
    updatedDate!: Date;
    updatedBy!: string;
}


export class Source {
    name!: string;
    details!: string;
    mailId!: string;
    dateOfReceiving!: Date;
    tagged!: string;

    constructor(candidateId: string, name: string, details: string, mailId: string, dateOfReceiving: Date, tagged: string) {
        this.name = name;
        this.details = details;
        this.mailId = mailId;
        this.dateOfReceiving = dateOfReceiving;
        this.tagged = tagged;
    }
}

export class CandidateHistory {
    _id!: string;
    candidateId!: string;// Need to include relation to CandidateDetails collection
    engagement!: string;
    status!: string;
    feedback!: string;
    evaluatedBy!: string;
    updatedDate!: Date;
    updatedBy!: string;
}  