# Proxy Dial API
This proxy demonstrates a simple approach to "dialing" to a new target endpoint.
The value of the "dialPercent" in the KVM determines the percentage of API calls that will be routed to the new target.
If "dialPercent" is not set or set to 0, then the legacy target and path is used.
If "dialPercent" is greater than 1 and less than 99 a random number is used to "estimate" the percentage.
If "dialPercent" is 100, then the new target and path is used.
In addition, each target uses a different path suffix.


Usage:
* curl https://{ORG}-{ENV}.apigee.net/proxy-dial/status

Responses:
* Cannot GET /LEG/dialPercent/25/useLegacy/true/random/56.0
* Cannot GET /new/dialPercent/25/useLegacy/false/random/23.0

This example uses mocktarget.apigee.net and the "Cannot GET" response is expected.

Note the different paths indicating different targets and variable values.

## Setup (be sure to create Target Servers first)
* apigeetool createkvmmap -N -o {ORG} -e {ENV} --mapName generic-dial
* apigeetool addEntryToKVM -N -o {ORG} -e {ENV} --mapName generic-dial --entryName dialPercent --entryValue 20
* apigeetool deployproxy -N -o {ORG} -e {ENV} -n proxy-dial-example -d .


## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC.and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.
