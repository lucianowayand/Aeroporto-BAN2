const { Prisma, PrismaClient } = require("@prisma/client");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");
const prisma = new PrismaClient();

const GetAll = async () => {
  try {
    const avioes = await prisma.$queryRaw`SELECT * FROM aviao`;
    return avioes;
  } catch (e) {
    throw new Error("Erro ao retornar aviões. " + e);
  }
};

const Create = async (body) => {
  try {
    const aviao =
      await prisma.$queryRaw`Insert into aviao values (${body.num_reg}, ${body.codigo_modelo})`;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      (e.code == "P2003" || e.code == "P2010")
    ) {
      throw new Error("Erro ao registrar avião. Código de modelo inválido" + e);
    }
    throw new Error("Erro ao registrar avião. " + e);
  }
};

const Update = async (body, id) => {
  try {
    const aviao = await prisma.$queryRaw`Update aviao set num_reg = ${parseInt(
      body.num_reg
    )}, 
    codigo_modelo = ${parseInt(body.codigo_modelo)}
    where num_reg = ${parseInt(id)}`;
  } catch (e) {
    throw new Error("Erro ao atualizar avião. " + e);
  }
};

const Delete = async (id) => {
  try {
    await prisma.$queryRaw`Delete from aviao where num_reg = ${parseInt(id)}`;
  } catch (e) {
    throw new Error("Erro ao deletar avião. " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };