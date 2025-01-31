# コンストラクタ
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* rcu_obj_base[meta class]
* cpp26[meta cpp]

```cpp
protected:
  rcu_obj_base() = default;  // (1)
  rcu_obj_base(const rcu_obj_base&) = default;  // (2)
  rcu_obj_base(rcu_obj_base&&) = default;  // (3)
```

## 概要
- (1): デフォルトコンストラクタ
- (2): コピーコンストラクタ
- (3): ムーブコンストラクタ


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
