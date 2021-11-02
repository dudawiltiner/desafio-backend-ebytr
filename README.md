
# Desafio Back-End - Ebytr

## Introdução

Essa é parte do desafio técnico da Ebytr reservada para o desenvolvimento do back-end foi feita para atender a arquitetura da stack [MERN](https://www.mongodb.com/mern-stack). Nesse trablho foram usados conhecimentos sobre modelagem de banco de dados e formas normais para se criar um banco de dados NoSQL sem duplcidade, com melhor manutenabilidade, menor probabilidade erros e conflitos. Foi usado a arquitetura de software MSC (Model, Service e Controller) para organizar o código de desenvolvimento da API e padrões REST para manter a qualidade e funcionamento da API.

As ferramentas principais utilizadas são:

[Express](https://expressjs.com/)<br>
[Atlas](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwinwMrL6frzAhXI7bMKHV82BzIYABAAGgJxbg&ae=2&ohost=www.google.com&cid=CAESQeD2sGi_xD8RTWY4JDlyEJwly51DfQNS88frVRtON4AOxDy5gG4e3pAes_vtTP4fim4bQab-qWK4PcZH72cumnHe&sig=AOD64_1IEHAdpgrztk-7RzXLMB1kZd8jwQ&q&adurl&ved=2ahUKEwjzirzL6frzAhVBlJUCHezrCmwQ0Qx6BAgDEAE)<br>
[MongoDB](https://www.mongodb.com/)<br>
[Node.js](https://nodejs.org/)<br>
[Postman](https://www.postman.com/)<br>
[Heroku](https://www.heroku.com/)<br>

---

## Uso do projeto localmente

### Clone do repositório

Após cada um dos passos a seguir, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido, caso tenha dificuldades e o exemplo não seja suficiente, não hesite em me contatar em _eduardawiltiner@gmail.com_.

1. Abra o terminal e crie um diretório no local de sua preferência com o comando **mkdir**:
```javascript
  mkdir backend-ebytr
```

2. Entre no diretório que acabou de criar e depois clone o projeto:
```javascript
  cd backend-ebytr
  git clone git@github.com:johnatas-henrique/meme-generator.git
```

### Instalação das dependências

3. Entre no diretório criado após a clonagem do repositório.
```javascript
  cd desafio-backend-ebytr
```

4. Installe todas as dependências.
```javascript
  npm install
```
### Debug da aplicação

5. Abra no ambiente de desenvolvimento de sua preferência.
```javascript
  code .
```

4. Rode a aplicação com o node.js.
```javascript
  npm run debug
```

### Realizar testes na aplicação

5. Rode o teste da aplicação com o node.js.
```javascript
  npm test
```
ou se preferir rodar por arquivo de teste:

```javascript
  NAME=<arquivodeteste> npm test
```
## Link para o deploy da API:
https://desafio-backend-ebytr.herokuapp.com/
```javascript
|_Para endpoints digite também:
|__/task
|__/collaborator
|__/status
```
