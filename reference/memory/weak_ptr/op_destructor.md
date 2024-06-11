# デストラクタ
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~weak_ptr();
```

## weak_ptrオブジェクトの破棄
監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトにとくに影響を与えずに`weak_ptr`オブジェクトを破棄する。


## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
