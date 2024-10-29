import requests
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SolanaTokenAnalyzer:
    def __init__(self):
        self.base_url = "https://public-api.solscan.io"
        self.headers = {
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0" # Some APIs require a user agent
        }

    def analyze_token(self, token_address: str):
        logger.info(f"Starting analysis for token: {token_address}")
        
        try:
            # Get token info
            logger.info("Fetching token info...")
            token_info = self._get_token_info(token_address)
            
            if not token_info:
                raise ValueError("No token information received from API")

            logger.info(f"Token info received: {token_info}")

            # Basic validation result
            return {
                'token_address': token_address,
                'token_name': token_info.get('name', 'Unknown'),
                'symbol': token_info.get('symbol', 'Unknown'),
                'final_score': 50,  # Default score for testing
                'detailed_scores': {
                    'basic_score': 50
                },
                'risk_level': 'Medium Risk'
            }

        except requests.exceptions.RequestException as e:
            logger.error(f"Network error: {str(e)}")
            raise ValueError(f"Network error: {str(e)}")
        except Exception as e:
            logger.error(f"Analysis error: {str(e)}")
            raise ValueError(f"Analysis error: {str(e)}")

    def _get_token_info(self, token_address: str):
        url = f"{self.base_url}/token/meta?tokenAddress={token_address}"
        logger.info(f"Making request to: {url}")
        
        try:
            response = requests.get(url, headers=self.headers)
            
            # Log response details
            logger.info(f"Response status code: {response.status_code}")
            logger.info(f"Response headers: {response.headers}")
            logger.info(f"Response body: {response.text}")
            
            response.raise_for_status()  # Raise exception for bad status codes
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return None