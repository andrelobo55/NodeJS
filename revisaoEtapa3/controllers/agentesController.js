const agentesRepository = require('../repositories/agentesRepository');
const validateDate = require('../utils/validateDate');

class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = "API Error";
    }
}

const getAll = async (req, res, next) => {
    try {
        const agentes = await agentesRepository.readAll();

        res.status(200).json(agentes);
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agente = await agentesRepository.readById(id);

        if (!agente) {
            return next(new APIError(404, "Agente não encontrado."));
        }

        res.status(200).json(agente);
    } catch (error) {
        next(error);
    }
}

const post = async (req, res, next) => {
    try {
        const { nome, dataDeIncorporacao, cargo } = req.body;

        if (!nome) {
            return next(new APIError(400, "Campo 'nome' está vazio."));
        }
        if (!dataDeIncorporacao) {
            return next(new APIError(400, "Campo 'dataDeIncorporacao' está vazio."));
        }
        if (!validateDate(dataDeIncorporacao)) {
            return next(new APIError(400, "Campo 'dataDeIncorporacao' está no formato inválido ou no futuro."))
        }
        if (!cargo) {
            return next(new APIError(400, "Campo 'cargo' está vazio."));
        }

        const agente = await agentesRepository.create({ nome, dataDeIncorporacao, cargo });

        res.status(201).json(agente);
    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agente = await agentesRepository.readById(id);

        if (!agente) {
            return next(new APIError(404, "Agente não encontrado."));
        }

        const { id: idBody } = req.body;

        if (idBody && idBody !== id) {
            return next(new APIError(400, "Não é permitido alterar o id."));
        }

        const { nome, dataDeIncorporacao, cargo } = req.body;

        if (!nome) {
            return next(new APIError(400, "Campo 'nome' está vazio."));
        }
        if (!dataDeIncorporacao) {
            return next(new APIError(400, "Campo 'dataDeIncorporacao' está vazio."));
        }
        if (!validateDate(dataDeIncorporacao)) {
            return next(new APIError(400, "Campo 'dataDeIncorporacao' está no formato inválido ou no futuro."))
        }
        if (!cargo) {
            return next(new APIError(400, "Campo 'cargo' está vazio."));
        }

        const agenteAtualizado = await agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });

        res.status(200).json(agenteAtualizado);
    } catch (error) {
        next(error);
    }
}

const patch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agente = await agentesRepository.readById(id);

        if (!agente) {
            return next(new APIError(404, "Agente não encontrado."));
        }

        const { id: idBody } = req.body;

        if (idBody && String(idBody) !== String(id)) {
            return next(new APIError(400, "Não é permitido alterar o id."));
        }

        const field = req.body;

        if (!field || Object.keys(field).length === 0) {
            return next(new APIError(400, "Nenhum campo preenchido."));
        }

        const agenteAtualizado = await agentesRepository.update(id, field);

        res.status(200).json(agenteAtualizado);
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agente = await agentesRepository.readById(id);

        if (!agente) {
            return next(new APIError(404, "Agente não encontrado."));
        }

        await agentesRepository.remove(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = { getAll, getById, post, put, patch, remove }