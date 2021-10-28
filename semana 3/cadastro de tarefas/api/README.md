# API com mongodb

### Para começar, digite no terminal:
 ``` 
npm start 
 ```

---

## **Rotas**:

- ### **Usuário:**

  <br>

  - **registrar** -> *(POST)*
    - route: **/register** 
    - *Body(JSON)*
    ```
      { "name": "Ronaldo", "email": "ronaldo@mail.com", "password": "123456" }
    ``` 

    <br>

  - **login** -> *(POST)*
    - route: **/login**
    - *Body(JSON)*
    ```
      { "email": "ronaldo@mail.com", "password": "123456"}
    ``` 

  <br>

  - **recuperar** -> *(POST)* 
    - route: **/recover** 
    - *Body(JSON)*
    ```
      { "email": "ronaldo@mail.com", "password": "novasenha"}
    ``` 

  <br>
