
import prisma from "../prisma/db";

const resolvers = {
  Query: {
    report: async (_: any, { id }: { id: any }) => {
      const report = await prisma.report.findUnique({
        where: { id: Number(id) },
        include: {
          injuries: true,
        },
      });
      return report;
    },
    allReports: async (_parents: any, _args: any, context: any) => {
      const allReports = await prisma.report.findMany({
        include: {
          injuries: true,
        },
      });
      return allReports;
    },
  },
  Report: {
    injuries: (report: any) => report.injuries,
  },
  Mutation: {
    createReport: async (_: any, { input }: { input: any }) => {
      const { reporter_name, report_name, date, time, injuries } = input;

      console.log("[Input]", input);

      try {
        const createdReport = await prisma.report.create({
          data: {
            report_name: report_name,
            reporter_name: reporter_name,
            date: date,
            time: time,
            injuries: {
              create: injuries,
            },
          },
          select: {
            injuries: true,
          },
        });
        console.log(createdReport);
        return createdReport;
      } catch (err) {
        console.log("[ERROR_CREATING_REPORT]", err);
        return null;
      }
    },
  },
};

export default resolvers;