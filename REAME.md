# Open Music API V2

### Kriteria 1 : Terdapat fitur registrasi pengguna (Menambahkan user)  
API yang Anda buat harus dapat menambahkan user melalui route:
* Method : **POST**
* URL : **/users**
* Body Request:
  ```
  {
    "username": string,
    "password": string,
    "fullname": string
  }
  ```
  
Objek user yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:
```
{
  "id": "user-Qbax5Oy7L8WKf74l",
  "username": "dicoding",
  "password": "encryptedpassword",
  "fullname": "Full Username"
}
```
Ketentuan:
* **Username** harus unik
  
Response:
* Status Code: **201**
* Response Body:
  ```
  {
    "status": "success",
    "message": "User berhasil ditambahkan",
    "data": {
      "userId": "user-Qbax5Oy7L8WKf74l"
    }
  }
  ```

### Kriteria 2 : Terdapat fitur login pengguna (menambahkan authentication)
API yang Anda buat harus tersedia fitur login user melalui route:
* Method : **POST**
* URL : **/authentications**
* Body Request:
  ```
  {
    "username": string,
    "password": string
  }
  ```
Ketentuan:
* Authentication menggunakan JWT token.
* JWT token harus mengandung payload berisi **userId** yang merupakan id dari user autentik.
* Nilai secret key token JWT baik access token ataupun refresh token wajib menggunakan environment variable **ACCESS_TOKEN_KEY** dan **REFRESH_TOKEN_KEY**.

Response:
* Status Code: **201**
* Response Body:
  ```
  {
    "status": "success",
    "message": "Authentication berhasil ditambahkan",
    "data": {
      "accessToken": "jwt.access.token",
      "refreshToken": "jwt.refresh.token"
    }
  }
  ```

### Kriteria 3 : Terdapat fitur refresh access token (memperbarui authentication)
API yang Anda buat harus tersedia fitur Refresh Access Token user melalui route:
* Method : **PUT**
* URL : **/authentications**
* Body Request:
  ```
  {
    "refreshToken": "jwt.refresh.token"
  }
  ```
Ketentuan:
* Refresh token memiliki signature yang benar serta terdaftar di database.
  
Response:
* Status Code: **200**
* Response Body:
  ```
  {
    "status": "success",
    "message": "Authentication berhasil diperbarui",
    "data": {
      "accessToken": "jwt.access.token"
    }
  }
  ```

### Kriteria 4 : Terdapat fitur logout pengguna (menghapus authentication)
API yang Anda buat harus tersedia fitur logout user melalui route:
* Method : **DELETE**
* URL : **/authentications**
* Body Request:
  ```
  {
    "refreshToken": "jwt.refresh.token"
  }
  ```
Ketentuan:
* Refresh token memiliki signature yang benar serta terdaftar di database.
  
Response:
* Status Code: **200**
* Response Body:
  ```
  {
    "status": "success",
    "message": "Refresh token berhasil dihapus"
  }
  ```

### Kriteria 5 : Terdapat fitur menambahkan playlist 
API yang Anda buat harus tersedia fitur menambahkan playlist melalui route:
* Method : **POST**
* URL : **/playlists**
* Body Request:
  ```
  {
    "name": string
  }
  ```

Objek user yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:
```
{
  "id": "playlist-Qbax5Oy7L8WKf74l",
  "name": "Lagu Indie Hits Indonesia",
  "owner": "user-Qbax5Oy7L8WKf74l"
}
```
  
Ketentuan:
* Playlist merupakan resource yang dibatasi (restrict). Untuk mengaksesnya membutuhkan access token.
* Properti **owner** merupakan user id dari pembuat playlist. Anda bisa mendapatkan nilainya melalui artifacts payload JWT.

Response:
* Status Code: **201**
* Response Body:
  ```
  {
    "status": "success",
    "message": "Playlist berhasil ditambahkan",
    "data": {
      "playlistId": "playlist-Qbax5Oy7L8WKf74l"
    }
  }
  ```

### Kriteria 6 : Terdapat fitur melihat daftar playlist yang dimiliki 
API yang Anda buat harus tersedia fitur melihat daftar playlist yang dimiliki pengguna melalui route:
* Method : **GET**
* URL : **/playlists**
  
Response:
* Status Code: **200**
* Response Body:
  ```
  {
    "status": "success",
    "data": {
      "playlists": [
        {
          "id": "playlist-Qbax5Oy7L8WKf74l",
          "name": "Lagu Indie Hits Indonesia",
          "username": "dicoding"
        },
        {
          "id": "playlist-lmA4PkM3LseKlkmn",
          "name": "Lagu Untuk Membaca",
          "username": "dicoding"
        }
      ]
    }
  }
  ```
  
Ketentuan:
* Playlist yang muncul hanya yang ia miliki saja.

### Kriteria 7 : Terdapat fitur menghapus playlist
API yang Anda buat harus tersedia fitur menghapus playlist melalui route:
* Method : **DELETE**
* URL : **/playlists/{playlistId}**

Ketentuan:
* Hanya owner playlist yang dapat menghapus playlist.

Response:
* Status Code: **200**
* Response Body:
  ```
  {
    "status": "success",
    "message": "Playlist berhasil dihapus",
  }
  ```

### Kriteria 8 : Terdapat fitur menambahkan lagu ke playlist
API yang Anda buat harus tersedia fitur menambahkan lagu ke playlist melalui route:
* Method : **POST**
* URL : **/playlists/{playlistId}/songs**
* Body Request:
  ```
  {
    "songId": string 
  }
  ```

Ketentuan:
* Hanya owner playlist (atau kolabolator) yang dapat menambahkan lagu ke playlist.
* songId wajib bernilai id lagu yang valid.

Response:
* Status Code: **201**
* Response Body:
  ```
  {
    "status": "success",
    "message": "Lagu berhasil ditambahkan ke playlist",
  }
  ```

### Kriteria 9 : Terdapat fitur melihat daftar lagu pada playlist
API yang Anda buat harus tersedia fitur melihat daftar lagu pada playlist melalui route:
* Method : **GET**
* URL : **/playlists/{playlistId}/songs**

Ketentuan:
* Hanya owner (dan kolabolator) playlist yang dapat melihat daftar lagu pada playlist.

Response:
* Status Code: **200**
* Response Body:
  ```
  {
    "status": "success",
    "data": {
      "songs": [
        {
          "id": "song-Qbax5Oy7L8WKf74l",
          "title": "Kenangan Mantan",
          "performer": "Dicoding"
        },
        {
          "id": "song-poax5Oy7L8WKllqw",
          "title": "Kau Terindah",
          "performer": "Dicoding"
        }
      ]
    }
  }
  ```

### Kriteria 10 : Terdapat fitur menghapus lagu dari playlist
API yang Anda buat harus tersedia fitur menghapus lagu dari playlist melalui route:
* Method : **DELETE**
* URL : **/playlists/{playlistId}/songs**
* Body Request:
  ```
  {
    "songId": string
  }
  ```

Ketentuan:
* Hanya owner playlist (atau kolabolator) yang dapat menghapus lagu dari playlist.
* songId wajib bernilai id lagu yang valid.

Response:
* Status Code: 200
* Response Body:
  ```
  {
    "status": "success",
    "message": "Lagu berhasil dihapus dari playlist",
  }
  ```