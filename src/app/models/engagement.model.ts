export default class Engagement {
    id!: number;
    engagementId!: string;
    name!: string;
    skillSet!: string;
    experience!: number;
    numberOfPositions!: number;
    location!: string;
    closeBy!: Date;

    createdBy!: string;
    createdDate!: Date;
    updatedBy!: string;
    updatedDate!: Date;
}