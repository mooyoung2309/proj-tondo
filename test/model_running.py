import pandas as pd
from keras.models import load_model
import tensorflow as tf

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

tokenizer = Tokenizer(num_words=5000)

train_data = pd.read_csv('C:/Users/PC/Documents/proj-tondo/test/modified.csv')
train_X = train_data['content']
train_Y = train_data['lable']
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

tokenizer.fit_on_texts(sentences)
train_X = tokenizer.texts_to_sequences(sentences)
train_X = pad_sequences(train_X, padding='post')


model = load_model('C:/Users/PC/Documents/proj-tondo/test/model.h5')
model.evaluate(train_X, train_Y)

def check_bad_comment(str):
    test_sentence = str.split(' ')
    test_sentences = []
    now_sentence = []
    for word in test_sentence:
        now_sentence.append(word)
        test_sentences.append(now_sentence[:])

    test_X_1 = tokenizer.texts_to_sequences(test_sentences)
    test_X_1 = pad_sequences(test_X_1, padding='post', maxlen=25)
    prediction = model.predict(test_X_1)
    # print(test_sentences[-1], prediction[-1][0])
    if prediction[-1][0] >= 0.8:
        return prediction[-1][0]
    else:
        return 0
