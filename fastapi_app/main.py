from fastapi_app.recommend import RecommenderEngine
import pickle
from fastapi import FastAPI, Query, HTTPException
from typing import Literal

app = FastAPI()

with open("LLM/recommender.pkl", "rb") as f:
    engine: RecommenderEngine = pickle.load(f)


@app.get("/recommend")
def recommend(input_type: Literal["user", "movie"], value: str):
    try:
        if input_type == "user":
            user_id = int(value)
            return {"recommendations": engine.collaborative_filtering(user_id)}
        return {"recommendations": engine.content_based_filtering(value)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
