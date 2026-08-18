# intmax_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using intmax_t = signed-integer-type;
}
```
* signed-integer-type[italic]

## 概要
最大の符号付き整数型。


## 備考
最大幅の符号付き整数型ではあるが、`long long`より広い拡張整数型のすべての値を表現できる必要はない。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [LWG Issue 3828. Sync `intmax_t` and `uintmax_t` with C2x](https://cplusplus.github.io/LWG/issue3828)
    - C++23で、C23との同期のため、`intmax_t`は`long long`より広い拡張整数型のすべての値を表現できる必要はないことが明確化された
