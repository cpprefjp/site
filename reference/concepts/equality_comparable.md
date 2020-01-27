# equality_comparable
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

## 概要
`equality_comparable`は、2つのオブジェクト`a`と`b`が`==`演算�で同値関係にあるかを表す要件である。


## 要件
以下の式が可能であること：

```cpp
a == b
```

- `a`と`b`は、任意の型`T`のオブジェクト
- 上述した式の結果として、`bool`に変換可能な型が返ること
- `==`が同値関係を持ち、以下の特性を持つこと：
    - 全ての`a`について、`a == a`が成り立つこと
    - `a == b`であれば、`b == a`であること
    - `a == b`かつ`b == c`であれば、`a == c`であること

