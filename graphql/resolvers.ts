import prisma from "@/prisma/db";
import { time } from "console";


const resolvers = {
    Query: {
        allReports: async (_parents: any, _args: any, context: any) => {
            return [{
                id: 1,
                reporter: "vidit",
                time: "1;08",
                date: "7/7/2023"
            }]
        },

    },
    // Mutation: {
    // createReport: async (_ : any, { input }) => {
    //     const { reporter, date, time, injuries } = input;
    //     try {
    //         const createdReport = await prisma.report.create({
    //             data: {
    //                 reporter: reporter,
    //                 date: date,
    //                 time: time,
    //                 injuries: {
    //                     create: injuries,
    //                 },
    //             },
    //             include: {
    //                 injuries: true,
    //             },
    //         });
    //         return createdReport;
    //     } catch (err) {
    //         return `${err}`;
    //     }
    // },
    // },
};

export default resolvers