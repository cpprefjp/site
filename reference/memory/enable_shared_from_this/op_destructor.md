# デストラクタ
* memory[meta header]
* std[meta namespace]
* enable_shared_from_this[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~enable_shared_from_this();           // (1) C++11
constexpr ~enable_shared_from_this(); // (1) C++26
```

## 概要
`*this`を破棄する。


## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]

## 参照
- [P0033R0 Re-enabling `shared_from_this`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0033r0.html)
- [P0033R1 Re-enabling `shared_from_this` (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0033r1.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)