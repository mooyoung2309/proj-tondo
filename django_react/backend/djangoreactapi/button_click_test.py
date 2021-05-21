#Code Description

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Log
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
chrome_driver = "C:\Python35\chromedriver.exe" # Your Chrome Driver path
driver = webdriver.Chrome(chrome_driver, options=chrome_options)

driver.get('https://accounts.google.com/signin/v2/identifier?hl=en&continue=https://news.google.com/')
email_str = 'wldudwn99@gmail.com'
password_str = 'answer!@07'
driver.find_element_by_id("identifierId").send_keys(email_str)
driver.find_element_by_id("identifierNext").click()
password = WebDriverWait(driver, 3).until(
EC.presence_of_element_located((By.XPATH, "//input[@type='password']" )))
password.send_keys(password_str)
element = driver.find_element_by_id('passwordNext')
driver.execute_script("arguments[0].click();", element)