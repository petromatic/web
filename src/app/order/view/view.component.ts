import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import crc32 from 'crc/crc32';
import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewOrderComponent implements OnInit {
  userId: string = null;
  orderId: string = null;
  order:Observable<any>;
  qrdata: any = {};
  qrjson: string;/*
  private privateKey: string = `
-----BEGIN RSA PRIVATE KEY-----
MIIBPAIBAAJBAJjGyb2ddpPqBS+PNWH81HSyX2axpF3fiMPRgXrWbXrZzOoEuDV1
9S3Fhdahx3ClxYbqWsV1s6dz/Y+fVEuVt7kCAwEAAQJBAIrvJKHSY/aJuGOS2Zod
wdvKJuYOIIrZ8NcbXKOoAvHXWMvCAj7JEmM7z+7UV0ED3ifaPQaTo8W975o7pOdc
tU0CIQDrbvK0cP8ySwa/CcRY9yLKoY9nVKxrYRHbK+HMt2ULVwIhAKYfXW7RUHaF
cLQAPaJ6KxZezidE9BJDZR9X7VCnZXtvAiBQKQSGH3skepsfbInn6K115LBY9GGI
ZhKYV0aYV1EWHQIhAIhb6JLFR9nx0MBADlenFmUnbur3A61WGtRulUMGFRwLAiEA
mzy5j+6LxtwMkf+UnQ346vv7zBhIO+RWpgB9tbO0Tmo=
-----END RSA PRIVATE KEY-----`;*/
  private privateKey: string = `\
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2snZS3kIfTZFIEM8o0yf4gTDrgNhuNQHbmU1QGcOsl0rXBjy
1YtkDM30zR3ZUUOqiJ0Unq/sVQsx+EbtlktHe2oVBPDeBlczOh8gBQJ1Xup0MPdk
wWM0MsBhvttt1tHF3RXbyWuABgsFEf50RjI1/18/sojifjFkK8iOeqwBw6UtZNtP
G7TSTcKiLc1bV3JgMcpMzSDI/6aMJPqzXRDTuWo5dWO8vsa7yDGArPkM6Kxe4D54
hc5UrTkBvtn8qtahoRAiM+19wdCYiNP5van+h0OYIxB74my4bfs4AH3H0b1t5gy6
oHH62FOje7BAdTjDzUFcXZnf/Zr8iR+s/md4HQIDAQABAoIBABWOV5tpBF4Zz7u7
BClurj39jC4D5UfplAXbcOC0hq0qItCDIMHLZwMf86OV8khga1fkahisapOCc9zr
WBM7vYI6VHHVLXrgcoqicGwt7tR4MxRz+3hWRtlNPRQp2GuW5XC/65Svw8BUq543
PMuBvPI5NzRm6jHWufDaZLdPZSkaWXQXvBH+bWtj5eeJMvpCBL0wj8aDCzVLQu4q
OUl4go8YcF0Ktj1O1oSpYmd40XRYGXBZj56wxK0c62Macc6TiFtZejMzFOw9qPKa
S0fi2yINqmg6b591JUo5F0tlGtMgbsgps2V8360srxctY8RZyyU/92IDtt00ofGV
Ig4Uax0CgYEA5faLhyMqo2oEo8RKtdmln6eQ3yj/OYuqE7lPYdi9ioQMFvS5rSqQ
1PTGGfspCSSAUHHVLeQsCbl0Xhr734sqHFhLYi1Uz1EG+CwbUBkNXnci2u/ReLk+
Gbl6TCPYMIQxrs7uLMmd2sqPJKSiZV0dYTRHqAMCBVygmoWAmTYAC88CgYEA849o
yreeOmT6e7gB0DZvgLM/N9Ze8eIHAfBSVTdW0DjHBbMr5K4i9RQ02CtwvwMcAgss
1Mp0cklhvXMHgjj0haVPnIPUbKdRkXHNzJCVr6/9/XjVKTnh8+5poMqDKzdfgQ8X
b2IEpYDZJBgELyfnY22tM1f4/mS8F3guIzyXHFMCgYEA3LIwVhE56nrk2QaZbMzk
VsTKFGGUD/Yp06QUuyL3ROhVcfKL/9TKCpafSG/yggO14X5dyR0h5nNFassazv8P
+wQB1McMjaqFtccer1BbtD1CBjwCHIorPyTyagA8itNTmyCdE/6qsD+WAOS/tegX
OiKiYmwAlITA3YsiT+ezQ6ECgYAQs47OB9VTz8TVYwLM0k7HFoOJQqv0DjnIyj/7
E/ZiBOKw415pKf+/qokNIb1ze7UZ9sY2OUPO6nVHVnH3Xgx2daWF6AxS/w462QDx
vCBnkbvq+7QyRYPXBEw9+GUSO5PS98P1oVUMPE+nh/YRfb0CNm0gDjJGz4WOXnFb
fTYnfQKBgQDaIToCzx9DhkYDdG1r3uE5UO7Zf8ff820jNjbmogrBQ2VOIJogj/wJ
8brjX1djx6EMvFS0wd81CeIQs2ImTkNOnCgq2pGQZIts9YsWNs74kCBKVR9ix04w
25sC3y6E6lpZIHAmBEJbWblvgZPc4bGawaTlNBveo8hdCyLpKKLMdw==
-----END RSA PRIVATE KEY-----`;

  constructor(private location: Location, private route: ActivatedRoute, public db: AngularFireDatabase) { 
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.orderId = params['oid'];
      if(this.orderId)
      {
        this.order = this.db.object(`/user_orders/${this.userId}/orders/${this.orderId}`).valueChanges();
        this.order.subscribe(val => {
          console.log(val);
          this.qrdata = {
            "invoiceId": this.orderId,
            "driver": `${val.driver.name} ${val.driver.surname} | ${val.driver.dni} `,
            "plate": val.truck.plate,
            "liters": val.value
          };
          this.qrjson = JSON.stringify(this.sign(this.qrdata));

          console.log(JSON.stringify(this.qrjson).trim());
        });
      }
    });
       
  }

  sign(msg){
    const signer = crypto.createSign('RSA-SHA512');
    const toSign = btoa(JSON.stringify(msg).trim());
    signer.update(toSign);
    console.log(toSign);
    const signature = signer.sign(this.privateKey, 'base64');
    console.log(signature);
    return {...msg, "signature": signature};
  }

  ngOnInit() {
  }

  print(){
    
  }

  back(){
    this.location.back();
  }
}
