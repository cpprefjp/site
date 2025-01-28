# rcu
* rcu[meta header]
* cpp26[meta cpp]

`<rcu>`ヘッダでは、並行なデータの参照・更新を実現する[Read-Copy Update(RCU)機構](https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%BC%E3%83%89%E3%83%BB%E3%82%B3%E3%83%94%E3%83%BC%E3%83%BB%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88)のための部品を定義する。

RCU同期メカニズムは、複数スレッド間で共有されるデータが高頻度で参照され、稀に更新されるようなユースケースに適している。RCU機構はスレッド間の排他制御を行わず、更新操作により不要となった古いデータを安全に解放するタイミング制御を行う。


| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`rcu_obj_base`](rcu/rcu_obj_base.md.nolink) | RCU対象オブジェクトの基底クラス(class template) | C++26 |
| [`rcu_domain`](rcu/rcu_domain.md.nolink) | RCUドメイン(class) | C++26 |
| [`rcu_default_domain`](rcu/rcu_default_domain.md.nolink) | デフォルトのRCUドメイン取得(function) | C++26 |
| [`rcu_synchronize`](rcu/rcu_synchronize.md.nolink) | RCUドメインのアンロック完了を待機(function) | C++26 |
| [`rcu_barrier`](rcu/rcu_barrier.md.nolink) | メモリ解放操作完了を待機(function) | C++26 |
| [`rcu_retire`](rcu/rcu_barrier.md.nolink) | メモリ解放操作をスケジュル(function template) | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`<hazard_pointer>`](hazard_pointer.md.nolink)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
