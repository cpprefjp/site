# rcu_default_domain
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  rcu_domain& rcu_default_domain() noexcept;
}
```
* rcu_domain[link rcu_domain.md]

## 概要
デフォルトのRCUドメインを取得する。


## 戻り値
静的記憶域期間をもつ[`rcu_domain`](rcu_domain.md)オブジェクトへの参照を返す。
この関数は常に同一オブジェクトへの参照を返す。


## 例外
投げない


## 備考
C++26時点では、この関数が[`rcu_domain`](rcu_domain.md)オブジェクトを作成する唯一の手段となっている。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`rcu_domain`](rcu_domain.md)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
