# unspecified-exception
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]
* [meta exposition-only]

```cpp
class unspecified-exception;
```

## 概要
`unspecified-exception`は、実行制御ライブラリの仕様定義で用いられる説明専用の例外型である。

例外オブジェクトは未規定の型をもち[`exception`](/reference/exception/exception.md)型の例外ハンドラにはマッチするが、[`dependent_sender_error`](dependent_sender_error.md)型のハンドラにはマッチしない。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::read_env`](read_env.md)
- [`execution::then`](then.md)
- [`execution::let_value`](let_value.md)
- [`execution::bulk_chunked`](bulk_chunked.md)
- [`execution::when_all`](when_all.md)
- [`execution::stopped_as_optional`](stopped_as_optional.md)
- [`not-a-sender`](not-a-sender.md)
- [`decay-copyable-result-datums`](decay-copyable-result-datums.md)


## 参照
- [P3914R0 Assorted NB comment resolutions for Kona 2025](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3914r0.html), US 209-332
