const db = require('../db/db');

async function create(object) {
    /*cria uma constante created que recebe um objeto. Depois, espera acessar a tabela
    agentes e insere ele. Após essa operação retorna a linha completa. O retorno é um 
    array. Então retornamos apenas o elemento que criamos*/
    const created = await db('casos').insert(object).returning("*");
    return created[0];
}

async function readAll() {
    /**
     *  result é um array que recebe todas as colunas da tabela casos.
     */
    const result = await db('casos').select("*");
    return result;
}

async function readById(id) {
    const result = await db('casos').where({ id: id }).first();
    return result;
}

async function update(id, fieldsToUpdate) {
    const updated = await db('casos').where({ id: id }).update(fieldsToUpdate).returning("*");
    return updated[0];
}

async function remove(id) {
    const removed = await db('casos').where({ id: id }).del();
    return true;
}

module.exports = { create, readAll, readById, update, remove };