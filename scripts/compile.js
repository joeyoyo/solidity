
const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

// cleanup
const compiledDir = path.resolve(__dirname, "../compiled");
fs.removeSync(compiledDir);
fs.ensureDirSync(compiledDir);

// compile
const contractPath = path.resolve(__dirname, "../contracts", "Car.sol");
let contractSource = fs.readFileSync(contractPath, "utf-8");


//预先定义好编译源json对象
let jsonContractSource = JSON.stringify({
  language: "Solidity",
  sources: {
    "Car.sol": {
      // 指明编译的文件名
      content: contractSource // solidity 源代码
    }
  },
  settings: {
    // 自定义编译输出的格式。以下选择输出全部结果。
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
});
console.log(jsonContractSource);


// 编译得到结果
let output = JSON.parse(solc.compile(jsonContractSource));

teamJson = {
  abi: {},
  bytecode: ""
};
console.log(output);
// output 为json对象，根据json结构保存对应的abi和bytecode
for (var contractName in output.contracts["Car.sol"]) {
  teamJson.abi = output.contracts["Car.sol"][contractName].abi;
  teamJson.bytecode =
    output.contracts["Car.sol"][contractName].evm.bytecode.object;
}

console.log(teamJson);

// 将teamJson数据输出到team.json文件
const filePath = path.resolve(compiledDir, `${contractName}.json`);
fs.writeFile(filePath, JSON.stringify(teamJson), function(err) {
  if (err) console.error(err);
  console.log("\n");
  console.log("contract compiled sucessfully.\n");
  console.log(`save compiled contract ${contractName} to ${filePath}`);
});
