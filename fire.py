import requests
from time import sleep
from datetime import datetime

sleep(1)
print("---------{}----------".format(datetime.now()))

def login_to_server():
    try:
        url = "http://www.google.com"
        response_res=requests.get(url)
        print(url+" : "+str(response_res.status_code))
        data = response_res.text
        # print(data)
        if "fgtauth" in data:
            return True
        else:
            print("Firewall Already Login")
            return False
    except Exception as e:
        print(e)
        pass

def login_to_server1():
    try:
        url = "http://www.gstatic.com/generate_204"

        response_datq = requests.get(url)
        print(response_datq.status_code)
        data = response_datq.text
        data = data.split("=")[-1].split(";")[0].replace('"', "")
        response_datq = requests.get(data)
        #print(response_datq.status_code)
        data = response_datq.text
        #print(data)
        list_data = data.split(" ")
        for index, value in enumerate(list_data):
            if "magic" in value:
                #print(value)
                magic = list_data[index+1].replace('value="', "").replace('">', "")
                break

        sdata = {"4Tredir":"http://www.gstatic.com/generate_204",
                "magic":magic,
                "username":"2686",
                "password":"8626"
                }

        # make post request
        response = requests.post(url, data=sdata)
        print(response.status_code)
        print(response.text)
        print(response.headers)
        print("Now Innternet Working")
        return True
    except Exception as e:
        print(e)
        pass

if __name__ == "__main__":
    for _ in range(10):
        if login_to_server():
            if login_to_server1():
                break
        else:
            break
        sleep(2)
