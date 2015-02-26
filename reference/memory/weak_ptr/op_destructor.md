#デストラクタ (C++11)
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]

```cpp
~weak_ptr();
```

##weak_ptrオブジェクトの破棄
監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトにとくに影響を与えずに`weak_ptr`オブジェクトを破棄する。


##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
