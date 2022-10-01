import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { aws_s3 as s3, aws_ssm as ssm } from 'aws-cdk-lib'

interface BucketStackProps extends StackProps {
  paramName: string
}

export class BucketStack extends Stack {
  constructor(scope: Construct, id: string, props: BucketStackProps) {
    super(scope, id, props)

    const { bucketName } = new s3.Bucket(this, 'MyFirstBucket')

    new ssm.StringParameter(this, 'mySsmParameter', {
      parameterName: props.paramName,
      stringValue: bucketName,
    })
  }
}
