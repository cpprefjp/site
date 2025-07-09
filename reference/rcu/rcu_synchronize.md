# rcu_synchronize
* rcu[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  void rcu_synchronize(rcu_domain& dom = rcu_default_domain()) noexcept;
}
```
* rcu_domain[link rcu_domain.md]
* rcu_default_domain[link rcu_default_domain.md]

## 概要
RCUドメインのアンロック完了を待機する。


## 効果
もし`rcu_synchronize`呼び出しが`dom`上のRCU保護区間`R`のロックを開く操作よりも確実に前に発生するのでなければ、`R`を閉じる[`unlock`](rcu_domain/unlock.md)まで現スレッドをブロックする。


## 同期操作
`R`を閉じる[`unlock`](rcu_domain/unlock.md)は、`rcu_synchronize`からの戻りよりも確実に前に発生する。


## 戻り値
なし


## 例外
投げない


## 備考
`rcu_synchronize`呼び出しは、暗黙に[`rcu_barrier`](rcu_barrier.md)を呼ばない。


## 例
```cpp example
#include <atomic>
#include <mutex>
#include <thread>
#include <rcu>

struct Data {
  int m1, m2;
};

// 共有データを指すポインタ
std::atomic<Data*> data;

void reader()
{
  std::scoped_lock slk{std::rcu_default_domain()};
  // 共有データを読み取り(Read)
  Data *p = data;

  std::println("{} {}", p->m1, p->m2);
}

void updater()
{
  Data *newdata = new Data{1, 2};
  // 新しいデータで共有データを更新(Update)
  Data *old_data = data.exchange(newdata);

  // 古いデータを読み取り中のスレッドがなくるまで待機する
  std::rcu_synchronize();
  delete old_data;
}

int main()
{
  // 共有データ初期化
  Data *newdata = new Data{0, 0};
  data.store(newdata);

  // 共有データへ並行アクセス
  std::jthread jt{[] {
    for (int i = 0; i < 3; i++) {
      reader();
    }
  }};
  updater();
}
```
* std::rcu_synchronize[color ff0000]
* std::rcu_default_domain[link rcu_default_domain.md]
* std::scoped_lock[link /reference/mutex/scoped_lock.md]
* exchange[link /reference/atomic/atomic/exchange.md]
* store[link /reference/atomic/atomic/store.md]

### 出力例
```
0 0
1 2
1 2
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
- [`rcu_domain`](rcu_domain.md)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
