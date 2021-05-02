from googleapiclient.discovery import build
import pandas
import time
import json
import collections
import model_running

api_key = 'AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM'
video_id = 'm-HStXuBpLw'

result = collections.defaultdict()
result[video_id] = collections.defaultdict()
result[video_id]['bad_comment'] = collections.defaultdict()

comments = list()
api_obj = build('youtube', 'v3', developerKey=api_key)
response = api_obj.commentThreads().list(part='snippet,replies', videoId=video_id, maxResults=100).execute()
bad_comment = []
num_of_bad_comments = 0
while response:
    for item in response['items']:
        comment = item['snippet']['topLevelComment']['snippet']
        comments.append(comment['textDisplay'])
        predict = model_running.check_bad_comment(comment['textDisplay'])
        if predict > 0:
            num_of_bad_comments += 1
            result[video_id]['bad_comment'][comment['authorChannelId']['value']] = collections.defaultdict()
            result[video_id]['bad_comment'][comment['authorChannelId']['value']]['nickname'] = comment[
                'authorDisplayName']
            result[video_id]['bad_comment'][comment['authorChannelId']['value']]['predict'] = str(predict)
            result[video_id]['bad_comment'][comment['authorChannelId']['value']]['comment'] = comment['textDisplay']

        if item['snippet']['totalReplyCount'] > 0:
            for reply_item in item['replies']['comments']:
                reply = reply_item['snippet']
                comments.append([reply['textDisplay'], reply['authorDisplayName'], reply['authorChannelId']['value']])

                predict = model_running.check_bad_comment(reply['textDisplay'])
                if predict > 0:
                    num_of_bad_comments += 1
                    result[video_id]['bad_comment'][reply['authorChannelId']['value']] = collections.defaultdict()
                    result[video_id]['bad_comment'][reply['authorChannelId']['value']]['nickname'] = reply[
                        'authorDisplayName']
                    result[video_id]['bad_comment'][reply['authorChannelId']['value']]['predict'] = str(predict)
                    result[video_id]['bad_comment'][reply['authorChannelId']['value']]['comment'] = reply['textDisplay']
                if len(comments) >= 1000:
                    break
        if len(comments) >= 1000:
            break
    if 'nextPageToken' in response:
        response = api_obj.commentThreads().list(part='snippet,replies', videoId=video_id,
                                                 pageToken=response['nextPageToken'], maxResults=100).execute()
    else:
        break

now = time.localtime()
now = time.strftime('%y/%m/%d-%H:%M:%S', now)

result[video_id]['info'] = collections.defaultdict()
result[video_id]['info']['num_of_comments'] = len(comments)
result[video_id]['info']['num_of_bad_comments'] = num_of_bad_comments
result[video_id]['info']['updated_time'] = now

file_path = "./sample.json"
with open(file_path, 'w') as outfile:
    json.dump(result, outfile, indent=2)
