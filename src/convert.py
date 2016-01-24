import csv
import json

data = []


def toBoolean(val):
    if val == 'TRUE':
        return True
    elif val == 'FALSE':
        return False

with open('all-tweets-processed.csv', 'rb') as csvfile:
    reader = csv.reader(csvfile)

    for row in reader:
        print row[1]

        #convert to ascii
        #udata=row[1].decode("utf-8")
        #asciidata=udata.encode("ascii","ignore")

        data.append({
            "tweet": row[1],
            "response":{
                "anger": toBoolean(row[4]),
                "surprise": toBoolean(row[5]),
                "sad": toBoolean(row[6]),
                "disgust": toBoolean(row[7]),
                "happy": toBoolean(row[8]),
            }
        })

#print data

with open('static/result.json', 'w') as fp:
    json.dump(data, fp, indent=2)
