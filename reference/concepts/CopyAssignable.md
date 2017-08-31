# CopyAssignable
* concepts[meta header]

## 概要
CopyAssignableは、任意の型`T`が、コピー代入可能であることを表す要件である。


## 要件
[MoveAssignable](MoveAssignable.md)の要件に加えて、以下の式が可能であること：

```cpp
t = v;
```

- `t`は、任意の型`T`の、変更可能な左辺値オブジェクト
- `v`は、任意の型`T`の左辺値オブジェクト(`const`であってもよい)
- 上述した式の戻り値型は`T&`であること
- 上述した式の戻り値は`t`であること
- 上述した式の結果として、`v`の状態は変わらず、`t`は`v`と同等になること


## 関連項目
- [`is_copy_assignable`](/reference/type_traits/is_copy_assignable.md)

