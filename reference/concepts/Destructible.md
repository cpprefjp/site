# Destructible
* concepts[meta header]
* std[meta namespace]

## 概要
Destructibleは、任意の型`T`が破棄可能であることを表す要件である。


## 要件
任意の型`T`の変更可能な左辺値オブジェクト`u`について、以下の式が可能であること：

```cpp
u.~T()
```

- この式を実行した結果として、オブジェクト`u`が所有する全てのリソースが回収され、例外を伝搬しないこと


## 関連項目
- [`is_destructible`](/reference/type_traits/is_destructible.md)

