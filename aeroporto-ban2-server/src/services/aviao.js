const { Prisma, PrismaClient } = require("@prisma/client");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");
const prisma = new PrismaClient();

const GetAll = async () => {
  try {
    const avioes = await prisma.aviao.findMany();
    return avioes;
  } catch (e) {
    throw new Error("Erro ao retornar aviões");
  }
};

const Create = async (body) => {
  try {
    const aviao = await prisma.aviao.create({
      data: {
        num_reg: body.num_reg,
        codigo_modelo: body.codigo_modelo,
      },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code == "P2003"
    ) {
      throw new Error("Erro ao registrar avião. Código de modelo inválido");
    }
    throw new Error("Erro ao registrar avião");
  }
};

const Update = async (body, id) => {
  try {
    const aviao = await prisma.aviao.update({
      data: {
        num_reg: body.num_reg,
        codigo_modelo: body.codigo_modelo,
        modeloId: body.modeloId,
      },
      where: {
        id,
      },
    });
  } catch (e) {
    throw new Error("Erro ao atualizar avião");
  }
};

const Delete = async (id) => {
  try {
    const aviao = await prisma.aviao.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    throw new Error("Erro ao deletar avião");
  }
};

module.exports = { GetAll, Create, Update, Delete };
