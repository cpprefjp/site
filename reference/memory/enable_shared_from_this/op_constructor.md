#コンストラクタ (C++11)
* memory[meta header]
* std[meta namespace]
* enable_shared_from_this[meta class]

```cpp
constexpr enable_shared_from_this() noexcept;                     // (1)
enable_shared_from_this(const enable_shared_from_this&) noexcept; // (2)
```

##enable_shared_from_thisオブジェクトの構築
- (1) デフォルトコンストラクタ
- (2) コピーコンストラクタ


##効果
- (1), (2) : `enable_shared_from_this<T>`オブジェクトを構築する


##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0
