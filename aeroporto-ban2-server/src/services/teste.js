const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetAll = async () => {
  try {
    const testes = await prisma.$queryRaw`SELECT * FROM teste`;
    return testes;
  } catch (e) {
    throw new Error("Erro ao retornar teste. " + e);
  }
};

const Create = async (body) => {
  try {
    console.log(
      `Insert into teste values (${body.codigo}, ${body.data}::timestamp, ${body.tempo}::time, ${body.pontuacao}, ${body.nro_anac}, ${body.nro_reg}, ${body.nro_tecnico})`
    );
    const teste =
      await prisma.$queryRaw`Insert into teste values (${body.codigo}, '${body.data}'::timestamp, '${body.tempo}'::time, ${body.pontuacao}, ${body.nro_anac}, ${body.nro_reg}, ${body.nro_tecnico})`;
  } catch (e) {
    throw new Error("Erro ao registrar teste. " + e);
  }
};

const Update = async (body, id) => {
  try {
    const teste = await prisma.$queryRaw`Update teste set 
    codigo = ${parseInt(body.codigo)}, 
    data = ${body.data}::timestamp,
    tempo = ${body.tempo}::time, 
    pontuacao = ${body.pontuacao}, 
    nro_anac = ${body.nro_anac}, 
    nro_reg = ${body.nro_reg}, 
    nro_tecnico = ${body.nro_tecnico} 
    where codigo = ${parseInt(id)}`;
  } catch (e) {
    throw new Error("Erro ao atualizar teste. " + e);
  }
};

const Delete = async (id) => {
  try {
    await prisma.$queryRaw`Delete from teste where codigo = ${parseInt(id)}`;
  } catch (e) {
    throw new Error("Erro ao deletar teste. " + e);
  }
};

module.exports = { GetAll, Create, Update, Delete };
