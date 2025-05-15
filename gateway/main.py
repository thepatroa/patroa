from fastapi import FastAPI, HTTPException
from services.facebook import get_facebook_campaigns

app = FastAPI()

@app.get("/facebook/campaigns")
def read_campaigns():
    try:
        return {"campaigns": get_facebook_campaigns()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
