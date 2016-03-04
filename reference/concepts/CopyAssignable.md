#CopyAssignable
* concepts[meta header]
* std[meta namespace]

[MoveAssignable](MoveAssignable.md)の要件に加えて、以下の式が可能であること：

```cpp
t = v;
```

- `t`は、任意の型`T`の、変更可能な左辺値オブジェクト
- `v`は、任意の型`T`の左辺値オブジェクト(`const`であってもよい)
- 上述した式の戻り値型は`T&`であること
- 上述した式の戻り値は`t`であること
- 上述した式の結果として、`v`の状態は変わらず、`t`は`v`と同等になること

