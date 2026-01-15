# DEV BUDDY

- creation of react application with the help of Vite package builder
- Installation of npm packages
    - TailwindCss
    - DaisyUI : provides you the Pre-wrote css components
    - React router Dom : Uses for the routing 
    - Axios : for fetching the api data
    
- Create BrowserRouter > Routes > Route =/ body > childrens
- Create Outlet in body component
- creation of login page 
    - using axios to fetch an api
    - CORS - Installing CORS in backend => add middleware with credentials - {origin, credentials:true}
    - while calling an api call from axios call => {withCredentials : true} so that it will show up the cookies without using https 
# Redux store
- creation of redux store using configureStore
- Providing the redux store and implements in react 
- creating a user slice and adding reducer to the store


# Deployment
1. Signing Aws account and creating instance 
2. chmod 400 <secretfile>.pem
3. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
4. Install node in terminal (ec2)
5. git clone 
6. frontend
    - npm install -> dependency install
    - npm run build
    - sudo dnf update
    - sudo dnf install nginx
    - sudo systemctl start eginx
    - sudo systemctl enable eginx
