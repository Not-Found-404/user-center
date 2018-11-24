export interface Attendance {
    id?: number;
    userId?: number;
    slideId?: number;
    beginAt?: Date;
    endAt?: Date;
}

export class AttendanceListResponse {
    beginTime?: String;
    endTime?: String;
    slideName?: String;
    id?: number;
}

export class ViewStatistics {
    id?: number;
    identify?: string;
    totalTime?: number;
    exitTimes?: number;
    attendanceId?: number;
}
