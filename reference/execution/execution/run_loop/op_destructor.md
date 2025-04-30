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
`run_loop`オブジェクトを破棄する。


## 効果
`count`が非`0`かつ`state`が[実行中(running)](run.md)のとき、[`terminate`](/reference/exception/terminate.md)を呼び出してプログラムを異常終了させる。
それ以外のとき、効果を持たない。


## 同期操作
[`run`](run.md)とデストラクタ以外のメンバ関数同時呼び出しは、データ競合を引き起こさない。


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
