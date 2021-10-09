# Comandos para versionar código no github

<p align="center"> 
    <img width="450" src="https://dev-to-uploads.s3.amazonaws.com/i/zbu0eocercv8edfs846m.png">
</p>

1. Prepara os arquivos alterados para commit.
    ```
    git add .
    ``` 

2. Permite que você veja quais alterações foram despreparadas, quais não foram e quais arquivos não estão sendo monitorados pelo Git
    ```
    git status
    ``` 

3. Confirma o estado do arquivo e adiciona uma mensagem relacionada a mudança.
    ```
    git commit -m "Mensagem de commit"
    ``` 

4. Transporta as mudanças (commits) do repositório local para o repositório no github.
    ```
    git push origin main
    ```

5. Captura as mudanças do repositório no github e atualiza o repositório local.
    ```
    git pull
    ``` 

#### **Acesse para conhecer outros comandos e/ou informações:**
https://comandosgit.github.io/

#### **.gitignore generator**
https://www.toptal.com/developers/gitignore

 - Escolha as tecnologias na barra de busca (ex: node)
    - https://www.toptal.com/developers/gitignore/api/node