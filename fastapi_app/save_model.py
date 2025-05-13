import pandas as pd
import pickle
from fastapi_app.recommend import RecommenderEngine

movies = pd.read_csv("/Users/timeless/movie_recommender/LLM/data/movies.csv")
ratings = pd.read_csv("/Users/timeless/movie_recommender/LLM/data/ratings.csv")

# Rename if needed
ratings.rename(columns={"user_id": "userId", "movie_id": "movieId"}, inplace=True)
movies.rename(columns={"movie_id": "movieId"}, inplace=True)

engine = RecommenderEngine(movies, ratings)
engine.collaborative_filtering(user_id=144402)

with open("/Users/timeless/movie_recommender/LLM/recommender.pkl", "wb") as f:
    pickle.dump(engine, f)

print("✅ RecommenderEngine pickled successfully.")
