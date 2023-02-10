import requests
from bs4 import BeautifulSoup

url = "https://wh40k.lexicanum.com/wiki/Thought_for_the_day_(A_-_H)"
page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")
text = soup.get_text()
print(text)
