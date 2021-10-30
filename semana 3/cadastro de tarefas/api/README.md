# API de cadadastro de tarefas

### Para começar, digite no terminal:
 ``` 
npm start 
 ```

- A API utiliza uma função middleware ***(isLogged)*** que compara o valor da chave **token** passado no **headers** em cada requisição. Dessa forma, é possivel controlar se o usuário tem ou não permissão para acessar as rotas da API.

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

- ### **Tarefas:**

  <br>

  Caso você utilize uma plataforma de consumo de APIs (ex: postman, insomnia etc...), **lembre-se de enviar o token no headers.**
  O valor da chave token é gerado quando o usuário se loga na aplicação. **(/login)**

  <br>

  - **criar** -> *(POST)*
    - route: **/tasks** 
    - *Body(JSON)*
    ```
      { "name": Terminar atividade"}
    ``` 

    <br>

  - **editar** -> *(PUT)*
    - route: **/tasks**
    - *Body(JSON)*
    ```
      { 
        "id": "617c9a924c7beedbb68cd064", 
        "name": "Ler um livro", 
        "isChecked": false
      }
    ``` 

  <br>

  - **excluir** -> *(DELETE)* 
    - route: **/tasks** 
    - *Body(JSON)*
    ```
      { "id": "617c9a924c7beedbb68cd064" }
    ``` 
   
  <br>
 
  - **listar** -> *(GET)* 
    - route: **/tasks** 
    - *Body(JSON)*

  <br>
 
  - **listar por ID** -> *(GET)* 
    - route: **/tasks/617c9a924c7beedbb68cd064** 
    - *Body(JSON)*
    
  <br>

---

#### **Os requisitos:**
- [x] O backend deve validar o token do usuario.

- [x] O backend deve permitir a criação de uma nova conta.

- [x] O backend deve salvar a conta do usuario com a senha criptografada.

- [x] O backend deve permitir a realização de login em uma conta existente.

- [x] O backend deve validar a senha digitada com a senha criptografada ao realizar login.

- [x] O backend deve permitir a recuperação de uma conta existente.

- [x] O backend deve permitir a listagem de tarefas cadastradas.

- [x] O backend deve permitir a criação de uma nova tarefa.

- [x] O backend deve permitir a edição de uma tarefa cadastrada.

- [x] O backend deve permitir a remoção de uma tarefa cadastrada.

- [x] O backend deve salvar em um log as ações dos usuarios na plataforma.

---
