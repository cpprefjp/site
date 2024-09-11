# enable_nonlocking_formatter_optimization
* chrono[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class Rep, class Period>
  inline constexpr bool enable_nonlocking_formatter_optimization<
    chrono::duration<Rep, Period>> =
      enable_nonlocking_formatter_optimization<Rep>;
}
```

## 概要
`duration`クラスに対する[`std::enable_nonlocking_formatter_optimization`](/reference/format/enable_nonlocking_formatter_optimization.md)変数テンプレートの特殊化。


## バージョン
### 言語
- C++26

## 関連項目
- [`std::enable_nonlocking_formatter_optimization`](/reference/format/enable_nonlocking_formatter_optimization.md)


## 参照
- [P3107R5 Permit an efficient implementation of `std::print`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3107r5.html)
- [P3235R3 `std::print` more types faster with less memory](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3235r3.html)
