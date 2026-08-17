# underlying
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* range_formatter[meta class]
* cpp23[meta cpp]

```cpp
constexpr formatter<T, charT>& underlying() noexcept;             // (1) C++23
constexpr const formatter<T, charT>& underlying() const noexcept; // (2) C++23
```
* formatter[link /reference/format/formatter.md]

## 概要
Rangeの要素型に対する[`formatter`](/reference/format/formatter.md)を取得する。

- (1) : 非const版
- (2) : const版


## 戻り値
メンバ変数として保持している、Rangeの要素型に対する[`formatter`](/reference/format/formatter.md)を返す。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 3839. `range_formatter`'s `set_separator`, `set_brackets`, and `underlying` functions should be `noexcept`](https://cplusplus.github.io/LWG/issue3839)
    - C++23で、この関数に`noexcept`が付加された
