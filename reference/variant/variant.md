# variant
* variant[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class... Types>
  class variant;
}
```

## 概要
`variant`クラスは、格納されうる候補の型リスト (`Types...`) に含まれる型のオブジェクトを切り替えながら保持する記憶域型である。継承関係にない複数の型を、単一のオブジェクトに代入・切り替えができる。

このクラスは動的メモリ確保は行わず、スタック領域のみを使用する。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](variant/op_constructor.md.nolink) | コンストラクタ | C++17 |
| [`(destructor)`](variant/op_destructor.md.nolink)   | デストラクタ | C++17 |


### 代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator=`](variant/op_assign.md.nolink) | 代入演算子 | C++17 |
| [`emplace`](variant/emplace.md.nolink)     | 要素型のコンストラクタ引数から直接構築する | C++17 |
| [`swap`](variant/swap.md.nolink)           | 他の`variant`オブジェクトとデータを入れ替える | C++17 |


### 値の観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`valueless_by_exception()`](variant/valueless_by_exception.md.nolink) | 例外によって値を持たない状態になっているかを判定する | C++17 |
| [`index`](variant/index.md.nolink) | 候補型の何番目の型が代入されているかを取得する | C++17 |


## 非メンバ関数
### 値の取得

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get`](variant/get.md.nolink) | 保持している値を取得する | C++17 |
| [`get_if`](variant/get_if.md.nolink) | 保持している値を取得する。エラー時にヌルポインタを返す | C++17 |


### ビジター

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`visit`](visit.md.nolink) | `variant`オブジェクトが現在保持している型に対応する関数を呼び出す | C++17 |


### 値の入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](variant/swap_free.md.nolink) | 2つの`variant`オブジェクトを入れ替える | C++17 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](variant/op_equal.md.nolink)         | 等値比較 | C++17 |
| [`operator!=`](variant/op_not_equal.md.nolink)     | 非等値比較 | C++17 |
| [`operator<`](variant/op_less.md.nolink)           | 左辺が右辺より小さいかを判定する | C++17 |
| [`operator<=`](variant/op_less_equal.md.nolink)    | 左辺が右辺以下かを判定する | C++17 |
| [`operator>`](variant/op_greater.md.nolink)        | 左辺が右辺より大きいかを判定する | C++17 |
| [`operator>=`](variant/op_greater_equal.md.nolink) | 左辺が右辺以上かを判定する | C++17 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T> struct hash;`              | `hash`クラスの先行宣言                 | C++17 |
| `template <class ...Types> struct hash<variant<Types...>>;` | `hash`クラスの`variant`に対する特殊化 | C++17 |


## アロケータインタフェース

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T, class Alloc> struct uses_allocator;` | `uses_allocator`クラスの先行宣言 | C++17 |
| `template <class... Types, class Alloc>`<br/> `struct uses_allocator<variant<Types...>, Alloc>;` | `uses_allocator`クラスの`variant`に対する特殊化 | C++17 |


## 例
```cpp example
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
