#CopyConstructible
* concepts[meta header]
* std[meta namespace]

[MoveConstructible](MoveConstructible.md)の要件に加えて、以下の式が可能であること：

```cpp
T u = v;
```

- `v`は、型`T`の左辺値オブジェクト(`const`であってもよい)
- 上述した式を実行した結果として、`v`の状態は変わらず、`u`は`v`と同等になること


さらに、以下の式が可能であること：

```cpp
T(v)
```

- `v`は、型`T`の左辺値オブジェクト(`const`であってもよい)
- 上述した式を実行した結果として、`v`の状態は変わらず、`T(v)`の結果となるオブジェクトは`v`と同等になること

