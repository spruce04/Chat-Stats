#Given the raw data in raw.txt parse it properly
import re
import json

#Helper function to sort the dict by value
def get_value(entry):
    return entry[1]

def main():
    #If running the program, open and parse the file
    count = {}
    current = 0
    with open('raw.txt', 'r', encoding='utf-8') as file:
        for line in file:
            #Tidy up the line
            line = line.strip().replace('~\u202f','').replace('\u200e','').replace('\u202a', '').replace('\u202c', '').replace('\u200d','').replace('\xa0', '')
            #Extract the username - between "] " and ":"
            name_start = line.find("] ")
            name_end = line.find(": ")
            if name_start == -1 or name_end == -1:
                continue
            name = line[name_start+2:name_end]
            #If the message wasn't sent by a user
            if name == "1 million beers": 
                continue
            #Add each name to the dictionary
            if name not in count:
                count[name] = 0

            
            #Find the difference in count from the previous line
            #Find the first post-name integer
            sub_msg = line[name_end+2:]
            temp = re.match(r'\d+', sub_msg)
            if not temp:
                continue
            temp = int(temp.group())
            #If we have an outlier, i.e an integer that leads to an improbable value, skip it
            if temp - current <= 0 or temp - current > 1000:
                continue
            count[name] += temp - current
            current = temp
        #Sort the now filled dictionary
        ordered = sorted(count.items(), key=get_value, reverse=True)

        #Construct a JSON object to write to the frontend
        output = {} 
        output["total"] = current
        output["leaderboard"] = []
        #Fill the leaderboard from the sorted dictionary
        for k, v in ordered:
            entry = {}
            entry["name"] = k
            entry["count"] = v
            output["leaderboard"].append(entry)
        #Write data to stats.json file
        with open("stats.json", "w") as f:
            json.dump(output, f, indent=2)
        print("Output saved in stats.json")
 

if __name__ == "__main__":
    main()