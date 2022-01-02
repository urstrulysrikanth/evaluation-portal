export default class Candidate {
    _id!: string;
    candidateDetails!: CandidateDetails;
    source!: Source;

    constructor(candidateDetails: CandidateDetails, source: Source) {
        this.source = source;
        this.candidateDetails = candidateDetails;
    }
}


export class CandidateDetails {
    _id!: string; // to be used in history table
    epNumber!: string;
    name!: string;
    mailId!: string;
    mobile!: number;
    skillSet!: string;
    location!: string;
    experience!: string;
    availability!: string;
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
    _id!: string;
    candidateId!: string;// Need to include relation to CandidateDetails collection
    name!: string;
    details!: string;
    mailId!: string;
    dateOfReceiving!: Date;
    tagged!: string;

    constructor(candidateId: string, name: string, details: string, mailId: string, dateOfReceiving: Date, tagged: string) {
        this.candidateId = candidateId;
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
    status!: string;
    updatedDate!: Date;
    updatedBy!: string;
}  