import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("CommonsBudget (proxy) V2", function () {
    let commonsBudget: Contract
    let commonsBudget2: Contract

    beforeEach(async function () {
        const CommonsBudget = await ethers.getContractFactory("CBudget")
        const CommonsBudgetV2 = await ethers.getContractFactory("CBudgetV2")

        //initilize with 42
        commonsBudget = await upgrades.deployProxy(CommonsBudget, { kind: 'uups' })
        console.log(commonsBudget.address, " CommonsBudget/proxy")
        console.log(await upgrades.erc1967.getImplementationAddress(commonsBudget.address), " getImplementationAddress")
        console.log(await upgrades.erc1967.getAdminAddress(commonsBudget.address), " getAdminAddress")
        await commonsBudget.set(100);
        let value = await commonsBudget.get();
        console.log("value of CommonsBudget: ", value);

        commonsBudget2 = await upgrades.upgradeProxy(commonsBudget.address, CommonsBudgetV2)
        console.log(commonsBudget2.address, " CommonsBudget/proxy after upgrade")
        console.log(await upgrades.erc1967.getImplementationAddress(commonsBudget2.address), " getImplementationAddress after upgrade")
        console.log(await upgrades.erc1967.getAdminAddress(commonsBudget2.address), " getAdminAddress after upgrade")


    })

    it("should retrieve value previously stored and increment correctly", async function () {
        let value = await commonsBudget2.get();
        console.log("value onf CommonsBudgetV2: ", value);
    })
});

// describe.only("CommonsBudget (proxy) V2 Second", function () {
//     let commonsProxy: Contract
//     let commonsStorage: Contract
//     let commonsBudget: Contract
//     let commonsBudget2: Contract
//
//     beforeEach(async function () {
//
//     })
//
//     it("Test my proxy", async function () {
//         const CommonsBudgetProxy = await ethers.getContractFactory("CommonsBudgetProxy")
//         const CommonsStorage = await ethers.getContractFactory("CommonsStorage")
//         const CommonsBudget = await ethers.getContractFactory("CommonsBudget")
//         const CommonsBudgetV2 = await ethers.getContractFactory("CommonsBudgetV2")
//
//         commonsProxy = await CommonsBudgetProxy.deploy();
//         await commonsProxy.deployed();
//         commonsStorage = await CommonsStorage.deploy();
//         await commonsStorage.deployed();
//         commonsBudget = await CommonsBudget.deploy();
//         await commonsBudget.deployed();
//
//         // set implementation
//         await commonsProxy.assignContract(commonsBudget.address);
//
//         let retVal = await commonsProxy.get();
//         console.log("return from V1: ", retVal);
//
//         await commonsProxy.set(99);
//         retVal = await commonsProxy.get();
//         console.log("2 return from V1: retVal", retVal);
//
//         // // deploy V2
//         // commonsBudget2 = await CommonsBudgetV2.deploy();
//         // await commonsBudget2.deployed();
//         //
//         // await commonsProxy.assignContract(commonsBudget2.address);
//         // retVal = await commonsProxy.get();
//         // console.log("return from V2: ", retVal);
//     })
// });