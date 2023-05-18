# MyRoof. Real Estate: Frontend

This project is deployed at Vercel [myroof.vercel.app](https://myroof.vercel.app).

## Project Overview
MyRoof is an intuitive web app where users can view and list real estate properties. 

## Features
- User Authentication/Authorization
- Search/filter of properties
- User Dashboard
- Detailed view of the property information
- Detailed view of the apartment complex information (to be implemented)
- View for listing properties 
- View for listing apartment complexes
- Image uploading
- Favorite/Bookmarked properties (to be implemented)
- Saved Search (to be implemented)
- Editing/Arhiving/Deleting properties (to be implemented)
- Previous contracts comments (to be implemented)


## Packages used 
- React.js (user authentication and private routing is implemented with React useContext)
- AWS Javascript SDK
- JWT-Decode
- Material UI

## Screenshots
![image](https://drive.google.com/uc?export=view&id=1sIViHTAOqKSTSamPHx1V7r_7PMloNxqL)
Main Page: Search Section
![image](https://drive.google.com/uc?export=view&id=1QJdanBfx0j6tXaz5LKh6BMx_HQ_QJtDY)
Main Page: Properties Section
![image](https://drive.google.com/uc?export=view&id=1cB-2TE_V2FydC34kUWs8ryp0ZlxAwZ9x)
Main Page: Apartment Complexes Section
![image](https://drive.google.com/uc?export=view&id=1x8oIgtDFDoo-NwFpo7PSnIGNvl2HrpCx)
Property Listing Page
![image](https://drive.google.com/uc?export=view&id=1NXTXvPiqQQV_7fZVwkPz_LfxWnLBdd5t)
Dashboard: Listed Properties Page
![image](https://drive.google.com/uc?export=view&id=1SLU7MRdf9o8AF--CiR4QjazeyFks5GxR)
Dashboard: Edit Account Page
![image](https://drive.google.com/uc?export=view&id=1y_WAb3NJnkGXK5QpZSK3CBu-zQ5U1FF8)
Property Detail View Page
![image](https://drive.google.com/uc?export=view&id=1VJNsKhZCFF3NSwykX4a2VBcNbI-_iebz)
Property Detail View Page

## How to Run?
If you want to try running this app in your local environment, follow the steps below:
1. Clone this repository
2. Run ```npm install``` in project root folder
3. Add .env file to project root folder with content 
  ```
  REACT_APP_BASE_URL=
  REACT_APP_ACCESS_KEY_ID=
  REACT_APP_SECRET_ACCESS_KEY=
  REACT_APP_REGION=
  REACT_APP_BUCKET=
  ```
  where the first variable is URL of backend API and the last 4 are related to AWS-SDK
4. Finally, run the app with ```npm start dev```
