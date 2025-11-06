export interface IComment {
    userId: string,
    date: Date,
    comment: string,
    grade: number
    imageBase64?: string
}