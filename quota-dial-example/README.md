# Quota Dial API
This proxy demonstrates a simple approach to "dialing" to a new target endpoint.
The value of the variables set in the KVM `dial-to` and `every` control the behavior.
- `dial-to` takes value of `new` or `legacy` (if not set goes to legacy)  
- `every` takes a number 0-N and is used as the quota limit (if not set defaults to 10)

The logic is `dial-to` the target `every` N calls, pretty simple, you can figure out the percentages, for example:  
```
No KVM or no values ALL traffic goes to legacy.  
0%   to new: dial-to=legacy every=0 calls.  
10%  to new: dial-to=new    every=10 calls.  
90%  to new: dial-to=legacy every=10 calls.  
100% to new: dial-to=new    every=0 calls.  
```

Usage and Response:  
10% to new, 90% to legacy -- (dial-to=new every=10)
```
for (( i=1; i <= 20; ++i )); do curl https://{ORG}-{ENV}.apigee.net/quota-dial/status; done
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=1/avail=9
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=2/avail=8
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=3/avail=7
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=4/avail=6
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=5/avail=5
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=6/avail=4
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=7/avail=3
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=8/avail=2
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=9/avail=1
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=10/avail=0
Cannot GET /V2/NEW/dial-to=new/every=10/use-new=true/target=new/allowed=10/used=10/avail=0
Cannot GET /v1/dial-to=new/every=10/use-new=/target=legacy/allowed=10/used=1/avail=9
...
```

90% to new, 10% to legacy -- dial-to=legacy every=10
```
$ for (( i=1; i <= 20; ++i )); do curl https://{ORG}-{ENV}.apigee.net/quota-dial/status; done
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=1/avail=9
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=2/avail=8
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=3/avail=7
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=4/avail=6
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=5/avail=5
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=6/avail=4
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=7/avail=3
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=8/avail=2
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=9/avail=1
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=10/avail=0
Cannot GET /v1/dial-to=legacy/every=10/use-new=/target=legacy/allowed=10/used=10/avail=0
Cannot GET /V2/NEW/dial-to=legacy/every=10/use-new=true/target=new/allowed=10/used=1/avail=9
...
```

This example uses mocktarget.apigee.net and the "Cannot GET" response is expected.

Note the different paths indicating different targets and variable values.

## Setup (be sure to create Target Servers first)
* apigeetool createkvmmap -N -o $ORG -e $ENV --mapName quota-dial-example
* apigeetool addEntryToKVM -N -o $ORG -e $ENV --mapName quota-dial-example --entryName dial-to --entryValue new
* apigeetool addEntryToKVM -N -o $ORG -e $ENV --mapName quota-dial-example --entryName every --entryValue 10
* apigeetool deployproxy -N -o $ORG -e $ENV -n quota-dial-example -d .

## Operation
Use the UI to change the values in the KVM or use apigeetool:
* apigeetool deleteKVMEntry -N -o $ORG -e $ENV --mapName quota-dial-example --entryName dial-to
* apigeetool deleteKVMEntry -N -o $ORG -e $ENV --mapName quota-dial-example --entryName every
* apigeetool addEntryToKVM -N -o $ORG -e $ENV --mapName quota-dial-example --entryName dial-to --entryValue legacy
* apigeetool addEntryToKVM -N -o $ORG -e $ENV --mapName quota-dial-example --entryName every --entryValue 5

## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC.and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.
