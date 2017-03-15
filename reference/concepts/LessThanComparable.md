# LessThanComparable
* concepts[meta header]
* std[meta namespace]

## 概要
LessThanComparableは、2つのオブジェクト`a`と`b`が`<`演算子で大小関係にあるかを表す要件である。


## 要件
以下の式が可能であること：

```cpp
a < b
```

- `a`と`b`は、任意の型`T`のオブジェクト
- 上述した式の結果として、`bool`に変換可能な型が返ること
- `<`は狭義の弱順序を持つこと

