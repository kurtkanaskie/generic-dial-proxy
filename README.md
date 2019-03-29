# Generic Dial API Examples
This repository contains 2 proxies demonstrating different approaches to "dialing" to a new target endpoint.

## Setup
* Clone this repository
* Create Target Servers one time (NOTE: apigeetool has an issue #144 so use curl)

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
* cd to respective proxy directories and follow README there
  * [README proxy-dial-example](proxy-dial-example/README.md)
  * [README quota-dial-example](quota-dial-example/README.md)

## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC.and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.
