# try_lock
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* rcu_domain[meta class]
* cpp26[meta cpp]

```cpp
bool try_lock() noexcept;
```

## 概要
RCU機構により保護される共有データの読み取り開始を宣言する。


## 効果
[`lock()`](lock.md)と等価。


## 戻り値
`true`


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


## 関連項目
- [`unlock`](unlock.md)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
