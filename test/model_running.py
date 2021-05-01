import pandas as pd
from keras.models import load_model
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
tokenizer = Tokenizer(num_words=2000)

data = pd.read_csv('modified.csv')
train_X = data['content']
train_Y = data['lable']
train_Y = pd.get_dummies(train_Y)
import re


# From https://github.com/yoonkim/CNN_sentence/blob/master/process_data.py

def clean_str(string):
    string = re.sub(r"[^가-힣A-Za-z0-9(),!?\'\`]", " ", string)
    string = re.sub(r"\'s", " \'s", string)
    string = re.sub(r"\'ve", " \'ve", string)
    string = re.sub(r"n\'t", " n\'t", string)
    string = re.sub(r"\'re", " \'re", string)
    string = re.sub(r"\'d", " \'d", string)
    string = re.sub(r"\'ll", " \'ll", string)
    string = re.sub(r",", " , ", string)
    string = re.sub(r"!", " ! ", string)
    string = re.sub(r"\(", " \( ", string)
    string = re.sub(r"\)", " \) ", string)
    string = re.sub(r"\?", "", string)
    string = re.sub(r"\s{2,}", " ", string)
    string = re.sub(r"\'{2,}", "\'", string)
    string = re.sub(r"\'", "", string)

    return string.lower()


sentences = [clean_str(sentence).split(' ') for sentence in train_X]
sentence_new = []
for sentence in sentences:
  sentence_new.append([word[:5] for word in sentence][:25])

sentences = sentence_new
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(sentences)
train_X = tokenizer.texts_to_sequences(sentences)
train_X = pad_sequences(train_X, padding='post')

model = load_model('model.h5')
model.evaluate(train_X, train_Y)

youtube_test = pd.read_csv('https://raw.githubusercontent.com/Y-Joo/Temperature_of_comments/main/results.csv')
youtube_comments = youtube_test['comment']

for test_sentence in youtube_comments:
    test_sentence = (test_sentence).split(' ')

    test_sentences = []
    now_sentence = []
    for word in test_sentence:
        now_sentence.append(word)
        test_sentences.append(now_sentence[:])

    test_X_1 = tokenizer.texts_to_sequences(test_sentences)
    test_X_1 = pad_sequences(test_X_1, padding='post', maxlen=25)
    if model.predict(test_X_1)[-1][0]<=0.2:
        print(model.predict(test_X_1)[-1])
        print(test_sentences[-1])
