# recommender_engine.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
import pickle


class RecommenderEngine:
    def __init__(self, movies_df, ratings_df):
        self.movies = movies_df
        self.ratings = ratings_df
        self.model = None  # Store trained SVD model if needed

    def content_based_filtering(self, movie_title, top_n=10):
        tfidf = TfidfVectorizer(stop_words="english")
        tfidf_matrix = tfidf.fit_transform(self.movies["genres"])
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

        try:
            idx = self.movies[self.movies["title"] == movie_title].index[0]
        except IndexError:
            return [f"Movie titled '{movie_title}' not found in the database."]

        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        movie_indices = [i[0] for i in sim_scores[1 : top_n + 1]]
        return self.movies["title"].iloc[movie_indices].tolist()

    def collaborative_filtering(self, user_id, top_n=10):
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(
            self.ratings[["userId", "movieId", "rating"]], reader
        )
        trainset, testset = train_test_split(data, test_size=0.2)

        algo = SVD()
        algo.fit(trainset)
        self.model = algo  # Save for reuse

        all_movie_ids = self.movies["movieId"].tolist()
        user_ratings = [
            (movie_id, algo.predict(user_id, movie_id).est)
            for movie_id in all_movie_ids
        ]
        sorted_ratings = sorted(user_ratings, key=lambda x: x[1], reverse=True)
        top_movie_ids = [i[0] for i in sorted_ratings[:top_n]]
        return self.movies[self.movies["movieId"].isin(top_movie_ids)]["title"].tolist()
