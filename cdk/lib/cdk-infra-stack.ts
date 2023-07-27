import * as cdk from "aws-cdk-lib";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as apprunner from "aws-cdk-lib/aws-apprunner";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as rds from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

export interface CdkInfraStackProps extends StackProps {
  readonly appName?: string;
}

export class CdkInfraStack extends Stack {
  private readonly appName: string;
  constructor(scope: Construct, id: string, props?: CdkInfraStackProps) {
    super(scope, id, props);
    if (props && props.appName) {
      this.appName = props.appName;
    } else {
      const appNameCtx = this.node.tryGetContext("app-name");
      //Generates Random ID in case context doesn't have app-name
      this.appName = appNameCtx
        ? appNameCtx
        : "infra-app-name" + (Math.random() + 1).toString(36).substring(7);
    }

    /************************************************************************/
    /****************************** VPC  ************************************/
    /************************************************************************/
    const vpc = new ec2.Vpc(this, `${this.stackName}-vpc`, {
      cidr: "10.0.0.0/26",
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 28,
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    /************************************************************************/
    /***************************** Postgresql SG *******************************/
    /************************************************************************/
    const dbServerSG = new ec2.SecurityGroup(this, `${this.stackName}-rds-sg`, {
      vpc,
      allowAllOutbound: true,
      description: "Ingress for Postgresql Server",
    });
    dbServerSG.addIngressRule(
      ec2.Peer.ipv4(vpc.vpcCidrBlock),
      ec2.Port.tcp(5432)
    );

    /************************************************************************/
    /****************************** Postgresql DB ********************************/
    /************************************************************************/
    const postgres = new rds.DatabaseInstance(
      this,
      `${this.stackName}-postgres-rds`,
      {
        engine: rds.DatabaseInstanceEngine.postgres({
          version: rds.PostgresEngineVersion.VER_15_2,
        }),
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.BURSTABLE3,
          ec2.InstanceSize.SMALL
        ),
        credentials: rds.Credentials.fromGeneratedSecret(this.appName, {
          secretName: `rds/dev/${this.appName}/postgres`,
        }),
        vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        autoMinorVersionUpgrade: true,
        allowMajorVersionUpgrade: false,
        securityGroups: [dbServerSG],
        multiAz: false,
        backupRetention: Duration.days(5),
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        storageEncrypted: false,
        allocatedStorage: 20,
        databaseName: this.appName,
      }
    );

    /************************************************************************/
    /************************ APPRUNNER Role and Service ********************/
    /************************************************************************/
    const appRunnerRole = new iam.Role(
      this,
      `${this.stackName}-apprunner-role`,
      {
        assumedBy: new iam.ServicePrincipal("build.apprunner.amazonaws.com"),
        description: `${this.stackName}-apprunner-role`,
        inlinePolicies: {
          "dpsspringbackend-apprunner-policy": new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ["ecr:GetAuthorizationToken"],
                resources: ["*"],
              }),
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: [
                  "ecr:BatchCheckLayerAvailability",
                  "ecr:GetDownloadUrlForLayer",
                  "ecr:GetRepositoryPolicy",
                  "ecr:DescribeRepositories",
                  "ecr:ListImages",
                  "ecr:DescribeImages",
                  "ecr:BatchGetImage",
                  "ecr:GetLifecyclePolicy",
                  "ecr:GetLifecyclePolicyPreview",
                  "ecr:ListTagsForResource",
                  "ecr:DescribeImageScanFindings",
                ],
                resources: [
                  "arn:aws:ecr:" +
                    this.region +
                    ":" +
                    this.account +
                    ":repository/dpsspringbackend",
                ],
              }),
            ],
          }),
        },
      }
    );

    /************************************************************************/
    /************************ APPRUNNER VPCConnector ************************/
    /************************************************************************/
    const vpcConnector = new apprunner.CfnVpcConnector(this, "vpcConnector", {
      subnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }).subnetIds,
      securityGroups: [dbServerSG.securityGroupId],
    });

    /************************************************************************/
    /************************ APPRUNNER Service *****************************/
    /************************************************************************/
    const appRunnerService = new apprunner.CfnService(
      this,
      `${this.stackName}-apprunner-service`,
      {
        serviceName: this.appName,
        sourceConfiguration: {
          authenticationConfiguration: {
            accessRoleArn: appRunnerRole.roleArn,
          },
          autoDeploymentsEnabled: true,
          imageRepository: {
            imageIdentifier: `${this.account}.dkr.ecr.${this.region}.amazonaws.com/${this.appName}:latest`,
            imageRepositoryType: "ECR",
            imageConfiguration: {
              port: "80",
              runtimeEnvironmentVariables: [
                {
                  name: "POSTGRES_USER",
                  value: this.appName,
                },
                {
                  name: "POSTGRES_PASS",
                  value: postgres.secret
                    ? postgres.secret.secretValueFromJson("password").toString()
                    : "password",
                },
                {
                  name: "POSTGRES_URL",
                  value: `jdbc:postgresql://${postgres.instanceEndpoint.hostname}/${this.appName}`,
                },
              ],
            },
          },
        },
        instanceConfiguration: {
          cpu: "1024",
          memory: "2048",
        },
        healthCheckConfiguration: {
          path: "/actuator/health",
          protocol: "HTTP",
        },
        networkConfiguration: {
          egressConfiguration: {
            egressType: "VPC",
            vpcConnectorArn: vpcConnector.attrVpcConnectorArn,
          },
        },
      }
    );

    /************************************************************************/
    /************************** APPRUNNER Service URL ***********************/
    /************************************************************************/
    new cdk.CfnOutput(this, "serviceUrl", {
      value: appRunnerService.attrServiceUrl,
      exportName: "serviceUrl",
    });
  }
}
