"use server";
import { connectToDataBase } from "@/db/connection";
import Courses, { CourseDocument } from "@/models/Courses";
import { revalidatePath } from "next/cache";

export async function createNewCourse({
    course_name,
    course_class,
}: {
    course_name: string;
    course_class: string;
}) {
    try {
        await connectToDataBase();
        const newCourse = new Courses({
            course_name,
            course_class,
        });

        const savedCourse = await newCourse.save();
        revalidatePath("/admin/courses");
        return {
            success: true,
            message: "Course created successfully",
            data: JSON.parse(JSON.stringify(savedCourse.toObject())),
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong",
            data: null,
        };
    }
}

export async function getAllCourses({
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "desc",
    status,
    batches,
}: {
    page?: number | string;
    limit?: number | string;
    sort?: string;
    order?: "asc" | "desc";
    status?: boolean;
    batches?: string;
}) {
    try {
        let filter: {
            status?: boolean;
            batches?: {
                $in: string[] | string;
            };
        } = {};

        if (status !== undefined) filter.status = status;

        if (batches !== undefined) filter.batches = { $in: batches };
        // Pagination
        const pageNumber = parseInt(page as string, 10);
        const pageSize = parseInt(limit as string, 10);
        const skip = (pageNumber - 1) * pageSize;

        // Sorting
        const sortOrder = order === "asc" ? 1 : -1;
        const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

        await connectToDataBase();

        const allCourses = await Courses.find(filter)
            .sort(sortQuery)
            .skip(skip)
            .limit(pageSize).populate("batches")
            .lean<CourseDocument[]>();

        const totalCourses = await Courses.countDocuments(filter);

        return {
            success: true,
            message: "Courses fetched successfully",
            data: JSON.parse(JSON.stringify(allCourses)),
            pagination: {
                totalCount: totalCourses,
                currentPage: pageNumber,
                limit: pageSize,
                totalPages: Math.ceil(totalCourses / pageSize),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong",
            data: [],
            pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
        };
    }
}

export async function searchCourses(search: string) {
    try {
        await connectToDataBase();
        const allCourses = await Courses.find({
            course_name: { $regex: search, $options: "i" },
        })
            .limit(100)
            .lean<CourseDocument[]>();
        return {
            success: true,
            message: "Courses fetched successfully",
            data: JSON.parse(JSON.stringify(allCourses)),
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong",
            data: [],
        };
    }
}
