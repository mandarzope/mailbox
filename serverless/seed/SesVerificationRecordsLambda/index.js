const { Route53, SES } = require('aws-sdk');
const { request: HttpsRequest } = require('https');
const { request: HttpRequest } = require('http');

import { parse } from 'url';
const handler = async (event, context) => {
    console.log('Event received', JSON.stringify(event));
    const {
        ResourceType,
        RequestType,
        ResourceProperties,
        HostedZoneId,
        LogicalResourceId
    } = event;
}
//     try {
//         if (ResourceType == "Custom::AmazonSesVerificationRecords") {
//             if (RequestType == 'Create')
//                 await verify_ses({ HostedZoneId, action: 'UPSERT' });
//             else if (RequestType == 'Delete')
//                 await verify_ses({ HostedZoneId, action: 'DELETE' });
//             else if (RequestType == 'Update') {
//                 const OldHostedZoneId = event['OldResourceProperties']['HostedZoneId']
//                 await verify_ses({ HostedZoneId: OldHostedZoneId, action: 'DELETE' })
//                 await verify_ses({ HostedZoneId, action: 'UPSERT' })
//             }
//             else
//                 console.log(`Request type is ${RequestType}, doing nothing.`)
//             const response_data = {}
//         }
//     } catch (e) {

//     }
// }

// async function verify_ses({
//     HostedZoneId,
//     action
// }) {

//     const ses = new SES();
//     console.log("Retrieving Hosted Zone name");

//     const HostedZoneName = await _GetHostedZoneName({ HostedZoneId })
//     console.log(`Hosted zone name: ${HostedZoneName}`)
//     const Domain = HostedZoneName.replace(/\.*$/g, '')
//     const { VerificationToken } = await ses.verifyDomainIdentity({
//         Domain
//     }).promise()
//     const { DkimTokens } = await ses.verifyDomainDkim({ Domain }).promise()
//     console.log('Changing resource record sets')
//     const Changes = [
//         {
//             'Action': action,
//             'ResourceRecordSet': {
//                 'Name': `_amazonses.${HostedZoneName}`,
//                 'Type': 'TXT',
//                 'TTL': 1800,
//                 'ResourceRecords': [
//                     {
//                         'Value': `"${VerificationToken}"`
//                     }
//                 ]
//             }
//         }
//     ]
//     for (let DkimToken of DkimTokens) {
//         const Change = {
//             'Action': action,
//             'ResourceRecordSet': {
//                 'Name': `"${DkimToken}._domainkey.${HostedZoneName}"`,
//                 'Type': 'CNAME',
//                 'TTL': 1800,
//                 'ResourceRecords': [
//                     {
//                         'Value': `${DkimToken}.dkim.amazonses.com`
//                     }
//                 ]
//             }
//         }
//         Changes.push(Change)
//     }
//     const route53 = new Route53();

//     await route53.changeResourceRecordSets({
//         ChangeBatch: {
//             Changes,
//         },
//         HostedZoneId
//     }).promise()
// }

// async function _GetHostedZoneName({
//     HostedZoneId
// }) {
//     const route53 = new Route53();
//     const route53_resp = await route53.getHostedZone({
//         Id: HostedZoneId
//     }).promise()
//     return route53_resp.HostedZone.Name;
// }

// async function Send({
//     event,
//     context,
//     ResponseStatus,
//     ResponseData,
//     PhysicalResourceId
// }) {
//     const { ResponseURL,
//         StackId,
//         RequestId,
//         LogicalResourceId, } = event;
//     const responseBody = {
//         Status: ResponseStatus,
//         Reason: 'See the details in CloudWatch Log Stream: ' + context.log_stream_name,
//         PhysicalResourceId,
//         StackId,
//         RequestId,
//         LogicalResourceId,
//         Data: ResponseData
//     }
//     const jsonLength = Buffer.from(JSON.stringify(responseBody)).length;
//     const headers = {
//         'content-type': '',
//         'content-length': jsonLength
//     }

//     await new Promise(function (resolve, reject) {
//         const url = parse(ResponseURL);
//         const Request = url.protocol == 'https' ? HttpsRequest : HttpRequest;
//         const Options = {
//             hostname: url.hostname,
//             path: url.path,
//             protocol: url.protocol,
//             headers
//         }
//         if (!!url.port && url.port != '80' && url.port != '443') {
//             Options.port = url.port
//         }
//         const req = Request(Options, (res) => {
//             var chunks = [];
//             res.on('data', (chunk) => {
//                 chunks = chunks.concat(chunk)
//             })
//             res.on('end', () => {
//                 const body = Buffer.concat(chunks);
//                 resolve(body)
//             })
//         })
//         req.on('error', (e) => {
//             reject(e)
//         })
//         req.write(JSON.stringify(responseBody))
//         req.end()
//     })
// }