export type SpringPage<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty: boolean;
};

export type User = {
    id:number;
    name: string;
    email: string;
    password: string;
    imgUrl: string;
    roles : Role[];
    notifications: Notification[];
    parentsId: number[];
    childrenId: number[];
    messagesSent: Message[];
    messagesReceived: Message[];
    subjectsSubscribedId: number[];
    subjectsTaughtId: number[];
    tests: Test[];
    notes: Note[];
}

export type Role = {
    id: number;
    authority : string;
}

export type Notification = {
    id: number;
    description: string;
    moment: string;
    read: boolean;
    userId: number;
}

export type Message = {
    id: number;
    text: string;
    moment: string;
    read: boolean;
    senderId: number;
    receiverId: number;
}

export type Test = {
    id: number;
    name: string;
    points: number;
    score: number;
    date: string;
    subjectId: number;
    studentsId: number[];
}

export type Subject = {
    id: number;
    name: string;
    team: string;
    imgUrl: string;
    teacherId: number;
    students: User[];
    tests: Test[];
    notes: Note[];
}

export type Note = {
    id: number;
    text: string;
    moment: string;
    subjectId: number;
    teacherId: number;
}
