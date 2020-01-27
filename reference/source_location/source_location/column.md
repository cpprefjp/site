# column
* source_location[meta header]
* function[meta id-type]
* std[meta namespace]
* source_location[meta class]
* cpp20[meta cpp]

```cpp
constexpr uint_least32_t column() const noexcept;
```
* uint_least32_t[link /reference/cstdint/uint_least32_t.md]

## 概要
[`source_location`](../source_location.md)オブジェクトが保持する列番号(行�からの文�数)を返す。

## 戻り値
[`source_location`](../source_location.md)オブジェクトが保持する列番号。

## 例外
投げない。

## 実装例
```cpp
constexpr uint_least32_t column() const noexcept { return column_; }
```
* uint_least32_t[link /reference/cstdint/uint_least32_t.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [P1208R6 Adopt source_location for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1208r6.pdf)
