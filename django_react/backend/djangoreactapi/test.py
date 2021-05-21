import json

tmp = {
    "SZ88hfr0jUo": {
      "info": {
        "num_of_comments": 1004,
        "num_of_bad_comments": 180,
        "updated_time": "21/05/10-23:58:52"
      },
      "bad_comments": {
          "UCtv6jF0Dgeb1pX80wpUg9Xw": {
            "nickname": [
              "kw pp"
            ],
            "predict": [
              "0.9691832"
            ],
            "comment": [
              "7\ubc88\uc740 \ucacc \uc81c\ubc1c \uac19\uc774 \ubc29\uc1a1\ud558\uc9c0\ub9c8\ub77c.<br />1\ubc884\ubc88\ub9cc \ubc29\uc1a1\ud574.."
            ]
          },
          "UC9wF2VAqkTPzbTlFp1AocbA": {
            "nickname": [
              "EHOON2"
            ],
            "predict": [
              "0.9971439"
            ],
            "comment": [
              "\ub0a8\uc7903\uba85\uc774 \ubaa8\uc774\uba74 1\uba85\uc758 \ub9ac\ub354\uac00 \uc0dd\uae40"
            ]
          },
          "UCVsj9nPA9QR2GJ1D9hLemOQ": {
            "nickname": [
              "\ubaa8\ub77d\ubaa8\ub77d"
            ],
            "predict": [
              "0.98425806"
            ],
            "comment": [
              "\ubab0\uc785\ud574\uc11c \ubcf4\uba74 \ubc1c\uc554\uc778\ub370<br />\uadf8\ub0e5 \uc608\ub2a5\uc774\ub77c \uc0dd\uac01\ud558\uace0 \ubcf4\uba74 \u3148\u3134 \uc6c3\uacbc\uc74c\u314b\u314b\u314b"
            ]
          },
          "UC0TuggA-B3b66cVRVN4aYhw": {
            "nickname": [
              "\uc774\uc794"
            ],
            "predict": [
              "0.871411"
            ],
            "comment": [
              "\uc74c..\uac00\uc624\uac00\uc774\ub3c4 6\ud654\ubcf4\uace0\ub098\uba74 \ud30c\uc774\uc5d0\ub3d9\ucc38\ud558\uace0 \uc2e4\ud589\uae4c\uc9c4\uc62c\ub824\uc11c \uc88b\uac8c\ubcf4\uc774\uc9c4\uc54a\ub2e4..<br />\uadfc\ub370 \ubb50 \uc774\ud615\uc740 5,6\ubc88\uac19\uc774 \uae4c\uc9c4\uc548\ud574\uc11c <br />\ube44\uad50\uc801 \uc88b\uac8c \ubcf4\uc774\ub294\ub4ef"
            ]
          }
      }
    }
} 

print(json.dumps(tmp, indent=2))
