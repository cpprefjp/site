# operator=
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* rcu_obj_base[meta class]
* cpp26[meta cpp]

```cpp
protected:
  rcu_obj_base& operator=(const rcu_obj_base&) = default; // (1)
  rcu_obj_base& operator=(rcu_obj_base&&) = default; // (2)
```

## 概要
- (1): コピー代入演算子
- (2): ムーブ代入演算子


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
