# copy_constructible
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

## 概要
`copy_constructible`は、任意の型`T`がコピー構築可能であることを表す要件である。


## 要件
[MoveConstructible](MoveConstructible.md)の要件に加えて、以下の式が可能であること：

```cpp
T u = v;
```

- `v`は、型`T`の左辺値オブジェクト(`const`であってもよい)
- 上述した式を実行した結果として、`v`の状態は変わらず、`u`は`v`と等価になること


さらに、以下の式が可能であること：

```cpp
T(v)
```

- `v`は、型`T`の左辺値オブジェクト(`const`であってもよい)
- 上述した式を実行した結果として、`v`の状態は変わらず、`T(v)`の結果となるオブジェクトは`v`と等価になること


## 関連項目
- [`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)

