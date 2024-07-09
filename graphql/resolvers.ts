import prisma from "@/prisma/db";

const resolvers = {
    Query: {
        allReports: async (_parents: any, _args: any, context: any) => {
            const allReports = await prisma.report.findMany({
                select: {
                    Injury: true
                }
            })
            return allReports
        },

    },
    Report: {
        injuries: (report: any) => report.injuries,
    },
    Mutation: {
        createReport: async (_: any, { input }: { input: any }) => {
            const { reporter_name, report_name, date, time, injuries } = input;

            console.log("[Input]", input)

            try {
                const createdReport = await prisma.report.create({
                    data: {
                        reporter: reporter_name,
                        date: date,
                        time: time,
                        Injury: {
                            create: injuries
                        },
                    },
                    select: {
                        Injury: true
                    }
                });
                console.log(createdReport)
                return createdReport;
            } catch (err) {
                console.log("[ERROR_CREATING_REPORT]", err)
                return null
            }
        },
    },
};

export default resolvers