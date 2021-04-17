#Main command for backend
run - `manage.py runserver <port: optional>`<br>
Install req - `pip install -r req.txt`

##Api

**Get prototype**<br>

`/api/prototype/` [GET] <br>
Option<br>
filter:
    
    /api/prototype/?filter=isShow   

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