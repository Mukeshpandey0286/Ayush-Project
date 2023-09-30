from textblob import TextBlob
from pymongo import MongoClient

# mongodb se connect karo
client = MongoClient("mongodb://localhost:27017/")
db = client["book_reviews"] 
collection = db["reviews"]  

# Example reviews for a book along with book name and author
book_reviews = [
    {"book_name": "Book1", "author": "Author1", "review": "This textbook is excellent. It helped me a lot in my studies."},
    {"book_name": "Book1", "author": "Author1", "review": "I didn't like this book. The explanations were unclear."},
    {"book_name": "Book2", "author": "Author2", "review": "Great reference book! Highly recommended."},
    {"book_name": "Book2", "author": "Author2", "review": "The book was okay, but it could be better."},
]

collection.insert_many(book_reviews)


positive_count = 0
negative_count = 0
neutral_count = 0

# Fetch reviews from MongoDB
reviews_from_db = collection.find({"book_name": "Book1"})  

# sentiment analysis 
for review_doc in reviews_from_db:
    review = review_doc["review"]
    analysis = TextBlob(review)
    sentiment_score = analysis.sentiment.polarity

  
    if sentiment_score > 0:
        positive_count += 1
    elif sentiment_score < 0:
        negative_count += 1
    else:
        neutral_count += 1


total_reviews = positive_count + negative_count + neutral_count
positive_percentage = (positive_count / total_reviews) * 100
negative_percentage = (negative_count / total_reviews) * 100
neutral_percentage = (neutral_count / total_reviews) * 100


print(f"Total Reviews: {total_reviews}")
print(f"Positive Reviews: {positive_percentage:.2f}%")
print(f"Negative Reviews: {negative_percentage:.2f}%")
print(f"Neutral Reviews: {neutral_percentage:.2f}%")


client.close()
