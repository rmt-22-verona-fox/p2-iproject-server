const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

class ThreadController {
  static async getThread(req, res, next) {
    try {
      const threadData = await prisma.thread.findMany({
        include: { post: true },
      });
      res.status(200).json(threadData);
    } catch (err) {
      console.log(err);
    }
  }
  static async addThread(req, res, next) {
    
  }
  static async detailThread(req, res, next) {}
  static async updateThread(req, res, next) {}
  static async deleteThread(req, res, next) {}
}

module.exports = ThreadController;
