from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TokenRequest(BaseModel):
    tokenAddress: str

@app.post("/analyze-token")
async def analyze_token(request: TokenRequest):
    logger.info(f"Analyzing token: {request.tokenAddress}")
    
    try:
        # Test response for debugging
        test_response = {
            "token_address": request.tokenAddress,
            "token_name": "Test Token",
            "symbol": "TEST",
            "final_score": 75.5,
            "detailed_scores": {
                "liquidity_score": 15.5,
                "holder_score": 18.0,
                "volume_score": 12.0
            },
            "risk_level": "Medium Risk",
            "analysis": "This is a test analysis response"
        }
        
        logger.info(f"Returning test response: {json.dumps(test_response)}")
        return test_response
        
    except Exception as e:
        logger.error(f"Error analyzing token: {str(e)}")
        return {
            "error": f"Analysis error: {str(e)}",
            "token_address": request.tokenAddress
        }

@app.get("/test")
async def test():
    return {"status": "API is working"}