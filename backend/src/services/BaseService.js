const Sequelize = require('sequelize');

class BaseService {
    constructor(Model) {
        this.Model = Model;
    }

    returnRow(pointerName, pointerValue) {
        return this.Model.findOne({
            where: {
                [pointerName]: pointerValue
            }
        })
    }

    returnTableData(offset, limit) {
        return this.Model.findAndCountAll({ offset, limit})
        .then(result => result.rows)

    }

    addRowInTable(newObj) {
        return this.Model.create(newObj)
    }

    deleteElementById(idElement) {
        return this.Model.destroy({
            where: {
                id: idElement
            }
        })
    }

    editRow(newObj) {
        
        let id = newObj.id;
                
        return this.Model.update(
            newObj, {
                where: {
                    id
                }
            }
        )
    }


}

module.exports = BaseService;