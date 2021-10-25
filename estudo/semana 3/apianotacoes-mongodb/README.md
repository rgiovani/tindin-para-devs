# API com mongodb

### Para começar, digite no terminal:
 ``` 
npm start 
 ```

---
<br>

Para que as rotas da api funcionem corretamente (ex: **/notes**), é preciso que durante a requisição seja passado o **headers** com a key **token**, o valor do token é obtido sempre que o usuário **efetuar login**.
Cada usuário possui suas próprias anotações.
Requisições sem token é considerado não autorizado pela API.

<br>

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

### **TEMPLATE:**
- [Template-usando-nodejs+express+typescript+mongodb](https://github.com/fabiotindin/template-node-ts-mongodb)
