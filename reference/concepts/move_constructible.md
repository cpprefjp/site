# move_constructible
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

## 概要
`move_constructible`は、任意の型`T`がムーブ構築可能であることを表す要件である。


## 要件
以下の式が可能であること：

```cpp
T u = rv;
```

- `rv`は、型`T`の右辺値オブジェクト
- 上述した式を実行した結果として、`u`はこの式を実行する前の`rv`と�価になること
- 上述した式を実行したあとの`rv`の状態は未規定とし、各ライブラリもしくは実装がその動作を規定する


さらに、以下の式が可能であること：

```cpp
T(rv)
```

- `rv`は、型`T`の右辺値オブジェクト
- `T(rv)`を実行した結果のオブジェクトは、その式を実行する前の`rv`と�価になること
- 上述した式を実行したあとの`rv`の状態は未規定とし、各ライブラリもしくは実装がその動作を規定する


## 関連項目
- [`is_move_constructible`](/reference/type_traits/is_move_constructible.md)

