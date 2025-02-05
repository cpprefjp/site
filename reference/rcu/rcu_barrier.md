# rcu_barrier
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  void rcu_barrier(rcu_domain& dom = rcu_default_domain()) noexcept;
}
```
* rcu_domain[link rcu_domain.md]
* rcu_default_domain[link rcu_default_domain.md]

## 概要
スケジュールされたメモリ回収操作の完了を待機する。


## 効果
RCUドメイン`dom`上でスケジュールされた回収操作を評価する可能性がある。
`rcu_barrier`呼び出しよりも前に発生する評価で、かつ`dom`上での操作`E`をスケジュールする評価については、`E`が評価されるまでブロックする。


## 同期操作
`E`のあらゆる評価は、`rcu_barrier`からの戻りよりも確実に前に発生する。


## 戻り値
なし


## 例外
投げない


## 備考
`rcu_barrier`呼び出しは、暗黙に[`rcu_synchronize`](rcu_synchronize.md)を呼ばない。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`rcu_retire`](rcu_retire.md)
- [`rcu_obj_base::retire`](rcu_obj_base/retire.md)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
