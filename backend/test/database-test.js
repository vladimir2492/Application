//test of database functions
const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const assert = require('assert');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserService = require('../src/services/UserService');
//const ProductService = require('../src/services/ProductService');
const userService = new UserService();
const uniqid = require('uniqid');

testOfDB();
async function testOfDB() {

    let newUser = {
        id: uniqid(),
        name: 'Katy',
        email: 'popova.ei.post@gmail.com',
        login: '@Katy',
        password: '1234',
        access: 'Admin'
    }

    describe('check database working', function() {

        it('check delete row', async function() {
            let dataOfTable1 = await userService.returnTableData();
            if (dataOfTable1[1].id) {
                let userId = dataOfTable1[1].id;
                await userService.deleteElementById(userId);
                let dataOfTable2 = await userService.returnTableData();
                let result = dataOfTable1.length - dataOfTable2.length;
                expect(result).to.equal(1);
            }
        })

        it('chck add row in table', async function() {
            let dataOfTable1 = await userService.returnTableData()
            let data1Length = dataOfTable1.length;
                //add hash-code of password
            bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
                if (err) throw err
                else {
                    newUser.password = hash;
                    await userService.addRowInTable(newUser);
                    let dataOfTable2 = await userService.returnTableData();
                    let data2Length = dataOfTable2.length;
                    let result = data2Length - data1Length;
                    assert.equal(result, 1);
                }
            })   
        })

        it('check return data from table', async function() {
            let dataOfTable = await userService.returnTableData();
            expect(dataOfTable.length).to.be.above(0)
        })

        it('check edit row', async function() {
            let dataOfTable = await userService.returnTableData();
            let userId = dataOfTable[0].id;
            if (userId) {
                await userService.editRow({name: 'No name', id: userId})
                let editedUser = await userService.returnRow('id',userId);
                expect(editedUser.name).to.equal('No name');
            }
        })

    })


}