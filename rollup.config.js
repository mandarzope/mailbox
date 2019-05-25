import typescript from 'rollup-plugin-typescript';

export default function (env) {
    const fs = require('fs');
    const path = require('path');
    const lambdaFunctionDir = path.join(__dirname, 'serverless', 'lambda');
    const functionsToBuild = env && env.fxn ? env.fxn.split(",") : fs.readdirSync(lambdaFunctionDir).filter(item => fs.lstatSync(path.join(lambdaFunctionDir, item)).isDirectory() && !item.match(/^\./));
    return functionsToBuild.map(fxn => ({
        input: `serverless/lambda/${fxn}/index.ts`,
        output: {
            file: `serverless/dist/${fxn}/index.js`,
            format: 'cjs'
        },
        external: ['request'],
        plugins: [
            typescript({
                exclude: /node_modules/i,
            })
        ]
    }))
}