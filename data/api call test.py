import requests

# Replace 'http://localhost:3000' with the correct base URL if your Next.js app is running on a different port or domain.
url = 'http://localhost:3000/api/employee'

# Send the GET request to the API
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Convert the response to JSON and print it
    employees = response.json()
    print("Employees:", employees)
else:
    print(f"Failed to fetch employees. Status code: {response.status_code}")
