# コンストラクタ
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
run_loop() noexcept;  // (1)
run_loop(run_loop&&) = delete;  // (2)
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピー／ムーブ構築の禁止


## 事後条件
(1) : [`run_loop`](../run_loop.md)の説明専用メンバ変数が次の通り初期化される。

- `count` : 値`0`
- `state` : 開始(starting)


## 例外
投げない


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
