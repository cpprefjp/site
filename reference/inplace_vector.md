# inplace_vector
* inplace_vector[meta header]
* cpp26[meta cpp]

`<inplace_vector>`ヘッダでは、コンパイル時に容量を決定する可変長配列の実装である`inplace_vector`コンテナを提供する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)
- [`<compare>`](compare.md)


## フリースタンディング
このヘッダのほとんどの機能は、フリースタンディング処理系でも使用できる。ただし、例外を送出する一部の機能などは、フリースタンディング処理系では提供されない、または削除される。詳細は各機能のページを参照。

| 名前 | 説明 | 対応バージョン |
|-----------------------------|----------------------------|-------|
| [`inplace_vector`](inplace_vector/inplace_vector.md) | 容量固定の可変長配列(class template) | C++26 |


## バージョン
### 言語
- C++26

## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
