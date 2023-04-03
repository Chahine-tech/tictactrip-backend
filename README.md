# API REST de justification de texte

Cette API REST permet de justifier un texte passé en paramètre. Elle retourne le texte justifié avec des lignes de même longueur en utilisant des espaces.

### Installation

Cloner ce repository sur votre machine locale.
Exécuter npm install pour installer les dépendances nécessaires.

### Utilisation

Exécuter npm start pour lancer le serveur.
Effectuer une requête HTTP POST à l'URL http://localhost:3000/api/justify avec le texte à justifier en paramètre.

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Authors

- [@Chahine-tech](https://www.github.com/Chahine-tech)
