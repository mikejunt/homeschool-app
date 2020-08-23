export interface User     {
    "id": number,
    "email": string,
    "firstName"?: string,
    "lastName"?: string,
    "photo"?: string,
    "minor"?: boolean,
    "parentEmail"?: string,
    "family"?: Object[],
    "tasksAssignee"?: Object[],
    "tasksAuthor"?: Object[],
    "userToFamily"?: Object[]
}