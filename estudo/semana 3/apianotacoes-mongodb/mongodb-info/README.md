# Entendendo o MongoDB

Algumas informações importantes sobre o mongoDB e a forma como ele opera.

#### **Conceitos:**

- Ao invés de tabelas, o mongo possui **collections**

- O mongo possui **documentos** que são objetos do tipo **BSON(BinaryJSON)**:
	- **BinaryJSON**: Possibilita um processamento mais rápido, esse objeto é guardado como binário ao invés de texto. Ele tambem permite representar dados mais complexos, como:
		- Data com informação de fuso horário.
		- Numeros grandes com maior precisão decimal. 
	
	<br>

- Exemplo de um objeto **BinaryJSON**:	
	```
	{
		"_id": UUID("7cbc07ae-b7ae-49c6-8ad8-57de7173f32d"),
		"name": "Ronaldo Giovani",
		"username": "ronaldogiovani",
		"email": "ronaldo@mail.com"
		"roles" : ["admin", "root"],
		"createdAt" : ISODate("2021-01-01T00:00:00Z")
	}
	```
*"É basicamente um JSON com super poderes" - Código fonte TV*

---

#### **Para visualizar as databases existentes, utilize:** ```show dbs ou databases```

---

### **Alguns comandos comuns:**

#### **use:** ```use minhabase``` 
- Seleciona um banco de dados, se o banco de dados não existir, então o cluster do MongoDB irá criá-lo.

<br>

#### **db:** É um objeto/uma variavel global que facilita nas consultas, ela da acesso as principais operações do sistema.

- Para ver qual database você esta atualmente, utilize: ```db```

- Para retornar um objeto que representa a collection (ex: users) em especificado, utilize: ```db.users ou db.getCollection('users')```

<br>

#### **insert:** Operação de inserção.
- Para cadastrar um registro dentro de uma collection, utilize: ```db.users.insert({"name":"Giovani"})```

<br>

#### **find:**  Operação de seleção
- Para retornar os registros de uma collection: ``` db.users.find() ```

- É possivel retornar apenas os registros que possuem um valor especifico. Note que nessa collection existe dois registros, o primeiro não possui o campo **username**, o segundo possui:
	```
	db.users.find()
	//retornos
	{"_id":ObjectID("..."), "name":"Tindin"}

	{"_id":ObjectID("..."), "name":"Ronaldo", "username":"Giovani" }
	```

- Note que na consulta abaixo apenas um registro da collection **users** foi retornado.
	```
	db.users.find({username: {$exists: true} })
	//retorno
	{"_id":ObjectID("..."), "name":"Ronaldo", "username":"Giovani" }
	```
	Essa consulta diz: **encontre um registro na coleção users onde o campo username for existente.**

- É possivel retornar apenas alguns campos ao invés de todos, passando para o find um segundo parâmetro que diz quais são os campos que queremos "ignorar", esse parâmetro é conhecido como **Projection**:
	```
	db.users.find({}, {_id: false}) 
	//retorna todos os registros da coleção users, porém sem o campo id
	```

#### **update:** Operação de alteração
- Atualiza um registro; o primeiro parametro do update é uma especie de WHERE, o segundo é o novo registro)

	```
	db.users.update({"name":"Giovani"), {"name":"Ronaldo"})
	```
#### **remove:** Operação de remoção
- Remove um ou mais registros onde o campo name dos registros em users é igual ao campo name informado no parametro.
	```
	db.users.remove({"name":"Ronaldo"})
	```


### **AGGREGATIONS:** 
- Para agrupar campos, somar valores etc... Basta utilizar as **Aggregations**, um conceito complexo porém muito util do mongo. Existem três modelos de aggregations: **Pipeline**, **Map-Reduce** e **Single Purpose**.

<br>

---

#### **Links:**

**→ MongoDB:** https://www.mongodb.com/pt-br

**→  Drivers do MongoDB:** https://docs.mongodb.com/drivers/

**→  Operadores do MongoDB:** https://docs.mongodb.com/manual/reference/operator/

**→  Operação create-database:** https://www.mongodb.com/pt-br/basics/create-database
