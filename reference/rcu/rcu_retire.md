# rcu_retire
* rcu[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std{
  template<class T, class D = default_delete<T>>
  void rcu_retire(T* p,
                  D d = D(),
                  rcu_domain& dom = rcu_default_domain());
}
```
* default_delete[link /reference/memory/default_delete.md]
* rcu_domain[link rcu_domain.md]
* rcu_default_domain[link rcu_default_domain.md]

## 概要
RCU機構により保護されるオブジェクト回収をスケジュールする。


## 適格要件
[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<D> == true`、かつ式`d(p)`が妥当であること。


## 事前条件
`D`はCpp17MoveCosntructible要件およびCpp17Destructible要件をみたすこと。


## 効果
- メモリを確保する可能性がある。
    - メモリ確保が`operator new`を呼び出すか否かは未規定である。
- `D`型のオブジェクト`d1`を`std::move(d)`で初期化する。
- RCUドメイン`dom`に対して式`d1(p)`の評価をスケジュールする。
    - 評価が例外で終了した場合は未定義の動作を引き起こす。
- `dom`に対してスケジュールされた評価を呼び出す可能性がある。


## 戻り値
なし


## 例外
[`bad_alloc`](/reference/new/bad_alloc.md)、または`d1`初期化中に送出された例外。


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

  // 古いデータを読み取り中のスレッドがなくなったタイミングで
  // データ領域の回収(メモリ解放)を行うようスケジューリングする
  std::rcu_retire(old_data);
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
* std::rcu_retire[color ff0000]
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
- [`rcu_domain::unlock`](rcu_domain/unlock.md)
- [`rcu_obj_base::retire`](rcu_obj_base/retire.md)


## 参照
- [P2545R4 Read-Copy Update(RCU)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2545r4.pdf)
