'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    var log = this.log;

    // Have Yeoman greet the user.
    this.log(yosay(
      'AWS ' + chalk.red('Lambda function') + ' generator!'
    ));

    function isS3Relative(answers) {
        return answers.isS3Lambda;
    }

    function isInputS3(answers) {
        return answers.isInputS3;
    }

    var prompts = [
      {
        type: 'input',
        name: 'functionName',
        message: 'What\'s the Lambda function name?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'role',
        message: 'The name(not full ARN, such as \'gff_lambda\') of the IAM role that Lambda assumes.',
        store: true
      },
      {
        type: 'input',
        name: 'timeout',
        message: 'The function execution time at which Lambda should terminate the function',
        store: true,
        default: 3,
      },
      {
        type: 'input',
        name: 'memorySize',
        message: 'The amount of memory(MB) for the function, must be multiple of 64.',
        store: true,
        default: 128
      },
      {
        type: 'input',
        name: 'awsAccountId',
        store: true,
        message: 'The ID of your aws account, which is a 12-digit number.'
      },
      {
        type: 'confirm',
        name: 'isS3Lambda',
        message: 'Connect this function to S3 bucket?',
        default: true
      },
      {
        type: 'input',
        name: 'bucketName',
        message: 'What\'s the S3 bucket name which you want to connect?',
        when: isS3Relative
      },
      {
        type: 'input',
        name: 'bucketOwnerId',
        when: isS3Relative,
        store: true,
        message: 'Bucket owner\'s account ID'
      },
      {
        type: 'checkbox',
        name: 'events',
        message: 'Events of Notifications.',
        when: isS3Relative,
        choices: [
            {
                name: 's3:ObjectCreated:*',
                checked: true
            },
            {
                name: 's3:ObjectCreated:Put'
            },
            {
                name: 's3:ObjectCreated:Post'
            },
            {
                name: 's3:ObjectCreated:Copy'
            },
            {
                name: 's3:ObjectCreated:CompleteMultipartUpload'
            },
            {
                name: 's3:ReducedRedundancyLostObject'
            }
        ]
      },
      {
        type: 'input',
        name: 'region',
        message: 'Your region, should be the same as you configured for aws-cli',
        when: isS3Relative,
        store: true,
        default: 'us-east-1'
      },
      {
        type: 'confirm',
        name: 'isInputS3',
        message: 'If generate S3 object input file, make s3 to trigger the test',
        default: true
      },
      {
        type: 'input',
        name: 'inputS3',
        message: 'S3 input file name',
        when: isInputS3,
        store: true,
        default: 'input-s3.json'
      }
    ];

    this.prompt(prompts, function (props) {
      if (props.events) {
          props.events = JSON.stringify(props.events)
      }

      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var props = this.props;
      console.log(props);
      this.fs.copyTpl(
        this.templatePath('_Makefile'),
        this.destinationPath('Makefile'),
        props
      );
      this.fs.copy(
        this.templatePath('_index.js'),
        this.destinationPath('index.js')
      );
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      if(props.isInputS3) {
        this.fs.copy(
            this.templatePath('input/input-s3.json'),
            this.destinationPath('input/input-s3.json')
        );
      }
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  }
});
