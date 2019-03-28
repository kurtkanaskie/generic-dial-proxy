# Generic Dial API
This proxy demonstrates a simple approach to "dialing" to a new target endpoint.
The value of the "dialPercent" in the KVM determines the percentage of API calls that will be routed to the new target.
If "dialPercent" is not set or set to 0, then the legacy target and path is used.
If "dialPercent" is greater than 1 and less than 99 a random number is used to "estimate" the percentage.
If "dialPercent" is 100, then the new target and path is used.
In addition, each target uses a different path suffix.


Usage:
* curl https://{ORG}-{ENV}.apigee.net/migrate-target/status

Responses:
* Cannot GET /LEG/dialPercent/25/useLegacy/true/random/56.0
* Cannot GET /new/dialPercent/25/useLegacy/false/random/23.0

This example uses mocktarget.apigee.net and the "Cannot GET" response is expected.

Note the different paths indicating different targets and variable values.

## Setup
* Clone this repository and `cd proxy-dial-example`
* Create Target Server new (NOTE: apigeetool has an issue #144)

```
curl -n -X POST https://api.enterprise.apigee.com/v1/o/$ORG/e/$ENV/targetservers -H 'Content-Type: application/json'   -H 'cache-control: no-cache'   -d '{
    "host": "mocktarget.apigee.net",
    "isEnabled": true,
    "name": "target-migration-new",
    "port": 443,
    "sSLInfo": {
        "ciphers": [],
        "clientAuthEnabled": "false",
        "enabled": "true",
        "ignoreValidationErrors": false,
        "protocols": []
    }
}'

```
* Create Target Server old

```
curl -n -X POST https://api.enterprise.apigee.com/v1/o/$ORG/e/$ENV/targetservers -H 'Content-Type: application/json'   -H 'cache-control: no-cache'   -d '{
    "host": "mocktarget.apigee.net",
    "isEnabled": true,
    "name": "target-migration-old",
    "port": 443,
    "sSLInfo": {
        "ciphers": [],
        "clientAuthEnabled": "false",
        "enabled": "true",
        "ignoreValidationErrors": false,
        "protocols": []
    }
}'
```
* apigeetool createkvmmap -N -o {ORG} -e {ENV} --mapName generic-dial
* apigeetool addEntryToKVM -N -o {ORG} -e {ENV} --mapName generic-dial --entryName dialPercent --entryValue 20
* apigeetool deployproxy -N -o {ORG} -e {ENV} -n proxy-dial-example -d .


## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC.and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.
