# デストラクタ
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
~run_loop();
```

## 概要
`run_loopオブジェクトを破棄する。


## 効果
`count`が非`0`かつ`state`が実行中(running)のとき、[`terminate`](/reference/exception/terminate.md)を呼び出す。
それ以外のときは、効果を持たない。


## バージョン
### 言語
- C++26


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
