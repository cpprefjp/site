# offset
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* default_accessor[meta class]
* cpp23[meta cpp]

```cpp
constexpr data_handle_type offset(data_handle_type p, size_t i) const noexcept;
```

## 概要
指定オフセット位置のハンドルを取得する。

## 戻り値
`p + i`


## 例外
投げない


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
