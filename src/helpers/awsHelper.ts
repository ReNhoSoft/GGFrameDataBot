import { ListObjectsV2Request, S3 } from '@aws-sdk/client-s3';
import { GetSecretValueCommand, GetSecretValueCommandOutput, SecretsManager } from '@aws-sdk/client-secrets-manager';

// TODO: Parametrize AWS Region
/// Helper class for AWS related operations
class AWSHelper {
    private readonly s3: S3 = new S3({ apiVersion: '2006-03-01', region: 'us-east-1' });
    private readonly sm: SecretsManager = new SecretsManager({ region: 'us-east-1' });

    async getSecretValue(secretName):  Promise<string> {
        return await this.sm.getSecretValue({ SecretId: secretName }).then((res: GetSecretValueCommandOutput) => { return res.SecretString; });
    }
}

export { AWSHelper }