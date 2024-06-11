# デストラクタ
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~unique_ptr();           // C++11
constexpr ~unique_ptr(); // C++23
```

## unique_ptrオブジェクトの破棄
所有権を持つ場合、所有しているリソースを解放する。


## 効果
[`get()`](get.md) が `nullptr` でなければ [`get_deleter`](get_deleter.md)`()(`[`get()`](get.md)`)` を呼び出す。


## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
