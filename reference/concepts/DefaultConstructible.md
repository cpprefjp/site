# DefaultConstructible
* concepts[meta header]

## 概要
DefaultConstructibleは、任意の型`T`がデフォルト構築可能であること表す要件である。


## 要件
以下の式が可能であること：

```cpp
T t;
```

- この式を実行した結果として、`t`はデフォルト初期化されること


さらに、以下の式が可能であること：

```cpp
T u{};
```

- この式を実行した結果として、`u`は値初期化されること


さらに、以下の式が可能であること：

```cpp
T()
T{}
```

- これらの式を実行した結果として、`T`型の一時オブジェクトは値初期化されること


## 関連項目
- [`is_default_constructible`](/reference/type_traits/is_default_constructible.md)

