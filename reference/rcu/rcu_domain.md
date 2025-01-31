# rcu_domain
* rcu[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  class rcu_domain;
}
```

## 概要
RCU同期メカニズムで保護する共有データに対応付ける、RCUドメインを表現する。

`rcu_domain`クラスは Cpp17Lockable 要件を満たし、共有データの読み取りをおこなうRCU保護区間を表現する。
RCU保護区間は`lock`呼び出しから`unlock()`呼び出しのまでの区間であり、RCUドメインに対して同一スレッド上でのRCU保護区間は入れ子になってもよい。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| `(constructor)` | コンストラクタ | C++26 |
| `operator=`     | 代入演算子     | C++26 |
| [`lock`](rcu_domain/lock.md) | 共有データの読み取り開始を宣言 | C++26 |
| [`try_lock`](rcu_domain/try_lock.md) | 共有データの読み取り開始を宣言 | C++26 |
| [`unlock`](rcu_domain/unlock.md) | 共有データの読み取り終了を宣言 | C++26 |


## 例
```cpp example
#include <rcu>
#include <mutex>

int main()
{
  std::rcu_domain& dom = std::rcu_default_domain();

  {
    std::scoped_lock rlock(dom);
    // dom.lock()が呼ばれる

  } // dom.unlock()が呼ばれる
}
```
* std::rcu_domain[color ff0000]
* std::rcu_default_domain[link rcu_default_domain.md]
* std::scoped_lock[link /reference/mutex/scoped_lock.md]


### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`rcu_default_domain`](rcu_default_domain.md)
- [`rcu_retire`](rcu_retire.md.nolink)
- [`rcu_obj_base::retire`](rcu_obj_base/retire.md)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
