# API - Cadastro de Aulas

### Para começar, digite no terminal:
 ``` 
npm start 
 ```

<br>

Para usar corretamente a API lembre-se de criar as tabelas no banco; segue o script abaixo:

```
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));
```

```
CREATE TABLE `class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));
```

```
  CREATE TABLE `users_online` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
```

É importante tambem criar o arquivo .env no projeto com as variaveis de ambiente:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=dev_tindin
```

Select para auxilio de login
```
select * from users where email="ronaldo@mail.com" and password="123456";
select * from users_online; //devolve os usuarios online
select * from users; //devolve os usuarios cadastrados
```

## **O Backend:**

- [x] deve permitir um usuário logar na aplicação.
  - [x] deve validar o login do usuario com os dados corretos (email, senha).
  - [x] deve validar a tentativa de login em contas que ja estão logadas.
  - [x] deve permitir deslogar apenas de contas logadas
- [] deve listar as aulas cadastradas por aquele usuario.
- [] deve permitir cadastrar novas aulas.
- [] deve permitir editar e excluir uma aula existente.

<br>

### **Rotas:**

- **login** -> *(POST)*
  - route: **/user/login**
  - *Body(JSON)*
  ```
    { "email": "ronaldo@mail.com", "password": "123456"}
  ``` 

<br>

- **logout** -> *(DELETE)* 
  - route: **/user/logout** 
  - *Body(JSON)*
  ```
    { "email": "ronaldo@mail.com", "password": "123456"}
  ``` 

<br>

- **listar** -> *(GET)*
  - route: **/users**

<br>

- **editar** -> *(PUT)*
  - route: **/user/edit** 
  - *Body(JSON)*
  ```
    { "id": 1, "email": "giovani@mail.com", "password": "12345678"}
  ``` 

<br>

- **detalhe** -> *(GET)*
  - route: **/user/:id**

<br>

- **criar** -> *(POST)*
  - route: **/user/register**
  - *Body(JSON)*
  ```
    { "email": "giovani@mail.com", "password": "12345678"}
  ``` 

<br>

- **excluir** -> *(DELETE)*
  - route: **/user**
  - *Body(JSON)*
  ```
    { "id": 1}
  ``` 

<br>


### **TEMPLATE:**
- [Template-usando-Nodejs+Express+Typescript](https://github.com/fabiotindin/template-node-ts.git)
