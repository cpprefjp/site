# rcu_obj_base
* rcu[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T, class D = default_delete<T>>
  class rcu_obj_base;
}
```
* default_delete[link /reference/memory/default_delete.md]

## 概要
RCU機構の保護対象とする型の基底クラス。

使用するときは、`T`で`rcu_obj_base`を公開継承した上で派生クラス`T`を`rcu_obj_base`のテンプレート引数にする(CRTP)。


## 適格要件
- `T`は不完全型でもよいが、特殊化された`rcu_obj_base`のメンバが参照されるまでに完全型とすること。
- `D`は関数オブジェクト型であり、`D`型の値`d`と`T*`型の値`ptr`に対して式`d(ptr)`が有効であること。
- `D`型は要件 Cpp17DefaultConstructible およ Cpp17MoveAssignable を満たすこと。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`(constructor)`](rcu_obj_base/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| [`operator=`](rcu_obj_base/op_assign.md) | 代入演算子 | C++26 |
| [`retire`](rcu_obj_base/retire.md) | オブジェクト再利用をスケジュールする | C++26 |


## 例
```cpp example
#include <atomic>
#include <mutex>
#include <thread>
#include <rcu>

struct Data : std::rcu_obj_base<Data> {
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

  // 古いデータを読み取り中のスレッドがなくなったタイミングで
  // データ領域の再利用(メモリ解放)を行うようスケジューリングする
  old_data->retire();
}

int main()
{
  // 共有データ初期化
  Data *newdata = new Data{0, 0};
  data.store(newdata);

  // 共有データへ並行アクセス
  std::jthread th{[] {
    for (int i = 0; i < 3; i++) {
      reader();
    }
  }};
  updater();
}
```
* std::rcu_obj_base[color ff0000]
* std::rcu_default_domain[link rcu_default_domain.md]
* std::scoped_lock[link /reference/mutex/scoped_lock.md]


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
