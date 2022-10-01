#!/usr/bin/env node
import 'source-map-support/register'
import { App, Tags } from 'aws-cdk-lib'
import { BucketStack } from '../lib/BucketStack'
import { CrossRegionStack } from '../lib/CrossRegionStack'

const paramName = '/crd/test/bucketName' // sets the ssm param globally

const app = new App()

new BucketStack(app, 'BucketStack', { paramName, env: { region: 'us-east-1' } })

new CrossRegionStack(app, 'ParamStack', {
  paramName,
  env: { region: 'us-west-2' },
})

Tags.of(app).add('foo', 'bar')
