export default class Candidate {
    _id: string | undefined;
    candidateDetails!: CandidateDetails;
    source!: Source;

    constructor(candidateDetails: CandidateDetails, source: Source) {
        this.source = source;
        this.candidateDetails = candidateDetails;
    }
}


export class CandidateDetails {
    _id: string | undefined; // to be used in history table
    epNumber: string | undefined;
    name: string | undefined;
    mailId: string | undefined;
    mobile: number | undefined;
    skillSet: string | undefined;
    location: string | undefined;
    experience: string | undefined;
    availability: string | undefined;
    status: string | undefined;
    pendingSinceDays: number | undefined;
    resumes: string | undefined;
    eligibilityXls: string | undefined;
    joiningDate: Date | undefined;

    createdDate: Date | undefined;
    createdBy: string | undefined;
    updatedDate: Date | undefined;
    updatedBy: string | undefined;
}


export class Source {
    _id: string | undefined;
    candidateId: string | undefined;// Need to include relation to CandidateDetails collection
    name: string | undefined;
    details: string | undefined;
    mailId: string | undefined;
    dateOfReceiving: Date | undefined;
    tagged: string | undefined;

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
    _id: string | undefined;
    candidateId: string | undefined;// Need to include relation to CandidateDetails collection
    status: string | undefined;
    updatedDate: Date | undefined;
    updatedBy: string | undefined;
}  