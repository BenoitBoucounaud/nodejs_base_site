# nodejs_base_site

App to learn node js


## Security
We gonna use [bcrypt](https://www.npmjs.com/package/bcrypt) package to hash our passwords

## Init : 
#### Node
https://nodejs.dev/learn
#### MongoDB
Create a free cluster named 'Cluster' from [Mongo's web site](https://www.mongodb.com/try?initial=true#community) with MongoDB Atlas  
User : user  
Password : edtX1Z9caAFzc4Jt  
When your cluster is created you can allow any IP adress to acces it in 'Network acces' -> 'add IP adress' -> 'Add access from anywhere'

#### Frontend 
- In frontend folder, to : 
    * clone the frontend
    * install all dependencies
    * launch fontend
```
git clone https://github.com/OpenClassrooms-Student-Center/go-fullstack-v3-fr.git frontend
cd frontend
npm install
npm run start
```

#### Backend
- In backend folder, to
    * permit to not relaunch server at any updates
    * install nodemon
    * install all dependencies : 
        -express
        -mongoose
        -mongoose unique validator
        -bcrypt
        -[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
        -[multer](https://www.npmjs.com/package/multer)
    * run server
```
npm install -g nodemon
npm install
nodemon server
```
