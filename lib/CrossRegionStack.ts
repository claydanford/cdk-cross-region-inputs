import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { custom_resources as cr } from 'aws-cdk-lib'

interface CrossRegionStackProps extends StackProps {
  paramName: string
}

export class CrossRegionStack extends Stack {
  constructor(scope: Construct, id: string, props: CrossRegionStackProps) {
    super(scope, id, props)

    // Get the param from the other region
    const getParameter = new cr.AwsCustomResource(this, 'GetParameter', {
      onUpdate: {
        service: 'SSM',
        action: 'getParameter',
        parameters: {
          Name: props.paramName,
          WithDecryption: true,
        },
        region: 'us-east-1',
        physicalResourceId: cr.PhysicalResourceId.of(Date.now().toString()),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    })

    new CfnOutput(this, 'UsEast1Bucket', {
      value: getParameter.getResponseField('Parameter.Value'),
    })
  }
}
