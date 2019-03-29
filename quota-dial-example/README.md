# Quota Dial API
This proxy demonstrates a simple approach to "dialing" to a new target endpoint.
The value of the headers `x-dial-to` and `x-every` control the behavior.  
- `x-dial-to` takes value of `new` or `legacy` (default goes to legacy)  
- `x-every` takes a number 0-N and is used as the quota limit.  

The logic is dial-to a target every N calls, pretty simple, you can figure out the percentages, for example:  
>x-dial-to:new x-every:10 calls is 10% traffic to new.  
>x-dial-to:legacy x-every:10 calls is 90% traffic to new.  
>x-dial-to:new x-every:0 calls is ALL traffic to new.  
>x-dial-to:legacy x-every:0 calls is ALL traffic to legacy.  
>no headers ALL traffic to legacy.

Usage and Response:  
10% to new
```
for (( i=1; i <= 20; ++i )); do curl https://{ORG}-{ENV}.apigee.net/quota-dial/status -H x-dial-to:legacy -H x-every:10; done
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=1/avail=9
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=2/avail=8
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=3/avail=7
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=4/avail=6
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=5/avail=5
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=6/avail=4
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=7/avail=3
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=8/avail=2
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=9/avail=1
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=10/avail=0
Cannot GET /v2/dialTo=new/every=10/target=new
Cannot GET /v1/dialTo=new/every=10/target=legacy/allowed=10/used=1/avail=9
```

10% to legacy
```
$ for (( i=1; i <= 20; ++i )); do curl https://{ORG}-{ENV}.apigee.net/quota-dial/status -H x-dial-to:legacy -H x-every:10; done
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v2/dialTo=legacy/every=10/target=new
Cannot GET /v1/dialTo=legacy/every=10/target=legacy/allowed=10/used=10/avail=0
Cannot GET /v2/dialTo=legacy/every=10/target=new
```


This example uses mocktarget.apigee.net and the "Cannot GET" response is expected.

Note the different paths indicating different targets and variable values.

## Setup (be sure to create Target Servers first)
* apigeetool deployproxy -N -o {ORG} -e {ENV} -n quota-dial-example -d .


## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC.and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.
