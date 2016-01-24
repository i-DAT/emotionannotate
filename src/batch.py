from Classifier import parallelClassifier, initFeatureProcessors
import csv
from itertools import islice

lexicon_feat, embed_feat = initFeatureProcessors()

with open('all-tweets-processed-.csv', 'wb') as exportfile:
    writer = csv.writer(exportfile)
    writer.writerow(['User','Content','Created','Detected With','anger','surprise','sad','disgust','happy'])
    with open('all-tweets.csv', 'rb') as csvfile:
        reader = csv.reader(csvfile)
        #for row in reader[490:]:
        for row in islice(reader, 1160, None):
            print row[1] # the tweet

            #convert to ascii
            udata=row[1].decode("utf-8")
            asciidata=udata.encode("ascii","ignore")

            result = parallelClassifier([{'text':asciidata}], lexicon_feat, embed_feat)
            print result[0]['emotions']
            writer.writerow([
                row[0],
                row[1],
                row[2],
                row[3],
                result[0]['emotions']['anger'],
                result[0]['emotions']['surprise'],
                result[0]['emotions']['sad'],
                result[0]['emotions']['disgust'],
                result[0]['emotions']['happy'],
            ])
