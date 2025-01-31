# unlock
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* rcu_domain[meta class]
* cpp26[meta cpp]

```cpp
void unlock() noexcept;
```

## 概要
RCU機構により保護される共有データの読み取り終了を宣言する。


## 事前条件
まだ閉じられていないRCU保護区間を開いた[`lock`](lock.md)呼び出しが、`unlock`呼び出しよりも前に順序付けられること。


## 効果
直近に開かれたRCU保護区間を閉じる。
`*this`上でスケジュールされた再利用操作を呼び出す可能性がある。


## 戻り値
なし


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
- [`lock`](lock.md)
- [`rcu_retire`](../rcu_retire.md.nolink)
- [`rcu_obj_base::retire`](../rcu_rcu_obj_base/retire.md.nolink)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
