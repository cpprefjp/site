# function_name
* source_location[meta header]
* function[meta id-type]
* std[meta namespace]
* source_location[meta class]
* cpp20[meta cpp]

```cpp
constexpr const char* function_name() const noexcept;
```

## 概要
[`source_location`](../source_location.md)オブジェクトが保持する関数名を返す。

## 戻り値
[`source_location`](../source_location.md)オブジェクトが保持する関数名。

## 事後条件
戻り値は有効なヌル終端バイト文�列(NTBS)である。

## 例外
投げない。

## 実装例
```cpp
constexpr const char* function_name() const noexcept { return function_name_; }
```

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