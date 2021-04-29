import pandas as pd
from keras.models import load_model

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
tokenizer = Tokenizer(num_words=2000)

model=load_model('model.h5')
youtube_test=pd.read_csv('https://raw.githubusercontent.com/Y-Joo/Temperature_of_comments/main/results.csv')
youtube_comments=youtube_test['comment']

for test_sentence in youtube_comments:

    test_sentence = test_sentence.split(' ')
    test_sentences = []
    now_sentence = []
    for word in test_sentence:
        now_sentence.append(word)
        test_sentences.append(now_sentence[:])

    test_X_1 = tokenizer.texts_to_sequences(test_sentences)
    test_X_1 = pad_sequences(test_X_1, padding='post', maxlen=25)
    prediction = model.predict(test_X_1)
    print(test_sentences[-1])
    print(prediction[-1])