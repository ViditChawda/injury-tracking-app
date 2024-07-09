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
    Report: {
        injuries: (report: any) => report.injuries,
    },
    Mutation: {
        createReport: async (_: any, { input }: { input: any }) => {
            const { reporter, date, time, injuries } = input;
            try {
                const createdReport = await prisma.report.create({
                    data: {
                        reporter: reporter,
                        date: date,
                        time: time,
                        // @ts-ignore
                        injuries: {
                            create: injuries,
                        },
                    },
                    include: {
                        injuries: true,
                    },
                });
                return createdReport;
            } catch (err) {
                return `${err}`;
            }
        },
    },
};

export default resolvers