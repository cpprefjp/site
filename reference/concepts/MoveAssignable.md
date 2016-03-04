#MoveAssignable
* concepts[meta header]
* std[meta namespace]

##概要
MoveAssignableは、任意の型`T`がムーブ代入可能であることを表す要件である。


##要件
以下の式が可能であること：

```cpp
t = rv;
```

- `t`は、任意の型`T`の、変更可能な左辺値オブジェクト
- `rv`は、任意の型`T`の右辺値オブジェクト
- 上述した式の戻り値型は`T&`であること
- 上述した式の戻り値は`t`であること
- 上述した式の結果として`t`は、この式を実行する前の`rv`と同等になること
- 上述した式を実行したあとの`rv`の状態は未規定とし、各ライブラリもしくは実装がその動作を規定する


##関連項目
- [`is_move_assignable`](/reference/type_traits/is_move_assignable.md)

