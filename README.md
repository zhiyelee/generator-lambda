# generator-lambda [![Build Status](https://secure.travis-ci.org/zhiyelee/generator-lambda.png?branch=master)](https://travis-ci.org/zhiyelee/generator-lambda)

> AWS Lambda function generator. Provide lambda function create/update/delete wrap. Include connecting lambda to inputed S3 bucket.


## Getting Started

Install and use generator

```bash
# install generator
npm install -g generator-lambda

# run
yo lambda
```

## Work with the generated lambda function

### Structure

```
➜ tree
.
├── Makefile
├── index.js
└── package.json

0 directories, 3 files
```

* `index.js`        Function code here, please do not change the file name, if you want, please change the `Makefile`  too.
* `Makefile`        Wrap of aws cli, provide function create/update/delete
* `package.json`    Any extra dependency here, use `npm i --save` for reuse.

### Makefile integrated

```bash
# create function, and connect it with inputed s3 bucket
make create

# update function code
make

# test lambda function with a mock S3 PUT event
make S3

# delete function
make delete
```

## How it works

### `make S3`

Use the `aws lambda invoke` command to test deployed lambda function with a mock s3 `PUT` event. The command will also print the log produced by the lambda function, which can also be seen in the AWS CloudWatch service. 

The mock data can be found in `input/input-s3.json`. It is much like a demo, feel free to edit it.

**Note:** If you want to Read/Write the resource referred in the event, please make sure your do own them.

## License

MIT
