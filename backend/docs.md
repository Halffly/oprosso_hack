#Main command for backend
run - `manage.py runserver <port: optional>`<br>
Install req - `pip install -r req.txt`

##Api

**Get prototype**<br>

`/api/prototype/` [GET] <br>
Option<br>
filter:
    
    /api/prototype/?filter=isShow   
**GET detail prototype**
`/api/prototype/<int: id>` [GET]<br>
<pre>
    {
        "data":	{
            "id": number,
            "title": string,
            "views": number,
            "ratings": number,
            'img': string,
            "isShow": string,
            "publicKey": string,
            'step': [{
                  "id": number,
                  "title": string,
                  "text": string,
                  "question": [string] 
            }]
        }
    }
</pre>

**Create prototype**
`/api/prototype/` [POST]<br>
<pre>
    {
        "title": string,
        "isShow": bool,
        "description": text,
        "img": Blob,
        "app": string,
        "step": [
            {
                "stepTitle": string,
                "stepText": string,
                "question": [string]
            }
        ]
    }
</pre>
if return success
<pre>
    {
        "message": "Success Create",
        "status": 200,
        'data': {}
    }    
</pre>