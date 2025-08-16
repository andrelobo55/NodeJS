const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = "API Error";
    }
}

const getAll = async (req, res, next) => {
    try {
        const casos = await casosRepository.readAll();

        res.status(200).json(casos);
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = await casosRepository.readById(id);

        if (!caso) {
            return next(new APIError(404, "Caso não encontrado."));
        }

        res.status(200).json(caso);
    } catch (error) {
        next(error);
    }
}

const post = async (req, res, next) => {
    try {
        const { titulo, descricao, status, agente_id } = req.body;

        if (!titulo) {
            return next(new APIError(400, "Campo 'titulo' não preenchido"));
        }
        if (!descricao) {
            return next(new APIError(400, "Campo 'descricao' não preenchido"));
        }
        if (!status) {
            return next(new APIError(400, "Campo 'status' não preenchido"));
        }
        if (!["aberto", "solucionado"].includes(status)) {
            return next(new APIError(400, "Campo 'status' deve ser 'aberto' ou 'solucionado'"));
        }
        if (!agente_id) {
            return next(new APIError(400, "Campo 'agente_id' não preenchido"));
        }

        const checkId = await agentesRepository.readById(agente_id);
        if (!checkId) {
            return next(new APIError(404, "agente_id não encontrado"));
        }

        const caso = await casosRepository.create({ titulo, descricao, status, agente_id });

        res.status(201).json(caso);
    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = await casosRepository.readById(id);

        if (!caso) {
            return next(new APIError(404, "Caso não encontrado"));
        }

        const { id: idBody } = req.body;

        if (idBody && idBody !== id) {
            return next(new APIError(400, "Não é permitido alterar o id"));
        }

        const { titulo, descricao, status, agente_id } = req.body;

        if (!titulo) {
            return next(new APIError(400, "Campo 'titulo' não preenchido"));
        }
        if (!descricao) {
            return next(new APIError(400, "Campo 'descricao' não preenchido"));
        }
        if (!status) {
            return next(new APIError(400, "Campo 'status' não preenchido"));
        }
        if (!["aberto", "solucionado"].includes(status)) {
            return next(new APIError(400, "Campo 'status' deve ser 'aberto' ou 'solucionado'"));
        }

        const checkId = await agentesRepository.readById(agente_id);
        if (!checkId) {
            return next(new APIError(404, "agente_id não encontrado"));
        }

        const casoAtualizado = await casosRepository.update(id, { titulo, descricao, status, agente_id });

        res.status(200).json(casoAtualizado);
    } catch (error) {
        next(error);
    }
}

const patch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = await casosRepository.readById(id);

        if (!caso) {
            return next(new APIError(404, "Caso não encontrado"));
        }

        const { id: idBody } = req.body;

        if (idBody && idBody !== id) {
            return next(new APIError(400, "Não é permitido alterar o id"));
        }

        const field = req.body;

        if (Object.keys(field).length === 0) {
            return next(new APIError(400, "Nenhum campo preenchido"));
        }

        const casoAtualizado = await casosRepository.update(id, field);

        res.status(200).json(casoAtualizado);

    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = await casosRepository.readById(id);

        if(!caso) {
            return next(new APIError(404, "Caso não encontrado"));
        }

        await casosRepository.remove(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = { getAll, getById, post, put, patch, remove }