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

# delete function
make delete
```


## License

MIT
