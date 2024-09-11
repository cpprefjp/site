# enable_nonlocking_formatter_optimization
* format[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr bool enable_nonlocking_formatter_optimization = false; // (1) C++26
}
```

## 概要
[`std::print()`](/reference/print/print.md)と[`std::println()`](/reference/print/println.md)の効率的な実装を有効にする。

この値が`true`で定義される場合、文字列フォーマットされた文字列のストリームへの書き込み時に、余分な動的メモリ確保を行わない。

とくに指定されない限り、標準ライブラリで[`std::formatter`](formatter.md)の特殊化が定義される型に対して、各ヘッダは以下の特殊化を定義する：

```cpp
template<>
inline constexpr bool enable_nonlocking_formatter_optimization<T> = true;
```

Rangeに対しては、以下が定義される：

```cpp
template <ranges::input_range R>
  requires (format_kind<R> != range_format::disabled)
inline constexpr bool enable_nonlocking_formatter_optimization<R> = false;
```
* ranges::input_range[link /reference/ranges/input_range.md]
* format_kind[link format_kind.md]
* range_format[link range_format.md]

[`std::pair`](/reference/utility/pair.md)および[`std::tuple`](/reference/tuple/tuple.md)に対しては、以下が定義される：

```cpp
template <class... Ts>
inline constexpr bool enable_nonlocking_formatter_optimization<pair-or-tuple<Ts...>> =
  (enable_nonlocking_formatter_optimization<Ts> && ...);
```


## 備考
- ユーザーは、任意のCV修飾されないユーザー定義型でこの型の特殊化を定義できる


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 18 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark noimpl]


## 関連項目
- [`std::print()`](/reference/print/print.md)
- [`std::chrono::duration`に対する`enable_nonlocking_formatter_optimization`](/reference/chrono/duration/enable_nonlocking_formatter_optimization.md)
- [`std::chrono::zoned_time`に対する`enable_nonlocking_formatter_optimization`](/reference/chrono/zoned_time/enable_nonlocking_formatter_optimization.md)


## 参照
- [P3107R5 Permit an efficient implementation of `std::print`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3107r5.html)
- [P3235R3 `std::print` more types faster with less memory](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3235r3.html)
