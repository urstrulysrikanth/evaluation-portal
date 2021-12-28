export default class Candidate {
    _id: string | undefined;
    candidateDetails!: CandidateDetails;
    source!: Source;
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
    Tagged: string | undefined;
}

export class CandidateHistory {
    _id: string | undefined;
    candidateId: string | undefined;// Need to include relation to CandidateDetails collection
    updatedDate: Date | undefined;
    updatedBy: string | undefined;
}  