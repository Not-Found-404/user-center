export interface Attendance {
    id?: number;
    userId?: number;
    slideId?: number;
    beginAt?: Date;
    endAt?: Date;
}

export class AttendanceListResponse {
    beginTime?: Date;
    endTime?: Date;
    slideName?: number;
    attendance?: Attendance;
}

export class ViewStatistics {
    id?: number;
    identify?: string;
    totalTime?: number;
    exitTimes?: number;
    attendanceId?: number;
}
