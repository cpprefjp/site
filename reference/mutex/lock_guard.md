# lock_guard
* mutex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Mutex>
  class lock_guard;
}
```

## 概要
`lock_guard`は、ミューテックスの`lock()`/`unlock()`処理をコンストラクタとデストラクタで確実に実行するためのクラスである。このクラスは通常、メンバ変数もしくはグ�ーバル変数としてもつミューテックスオブジェクトに対し、ブ�ックスコープの先�で`lock()`を呼び出し、同ブ�ックスコープを抜ける際に`unlock()`を確実に呼び出すために使用される。この手法は、[Scoped Locking Pattern](http://www.cs.wustl.edu/~schmidt/PDF/ScopedLocking.pdf)として知られている。

テンプレートパラメータ`Mutex`は、`lock()`/`unlock()`メンバ関数を持つあらゆるミューテックスクラスを扱うためのものである。ミューテックス型をパラメータ化するScoped Locking手法は、[Strategized Locking Pattern](http://wiki.hsr.ch/PnProg/files/StrategizedLocking.pdf)として知られている。

`lock_guard`は、非常にシンプルな機能「コンストラクタで�ックを取得/�ック済みミューテックスを受け取る」「デストラクタで�ックを手放す」しか提供しないが、使用メモリや実行時処理に関するオーバーヘッドは小さい（ほぼゼ�）。一方で、より高度なミューテックスの�ック操作が必要な場合は[`unique_lock`](/reference/mutex/unique_lock.md)を利用する。

なお、C++17では複数のミューテックスを�しく簡便に扱うために[`scoped_lock`](/reference/mutex/scoped_lock.md)が追加されている。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|----------------|-------|
| [`(constructor)`](lock_guard/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](lock_guard/op_destructor.md) | デストラクタ   | C++11 |
| `operator=(const lock_guard&) = delete`       | 代入演算�     | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|-------------------------|-------|
| `mutex_type` | ミューテックス型`Mutex` | C++11 |


## 例
```cpp example
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

// std::coutへのアクセスを排他的にする
std::mutex print_mtx_;
void safe_print(int x)
{
  std::lock_guard<std::mutex> lock(print_mtx_);
  std::cout << x << std::endl;
}

class X {
  std::mutex mtx_;
  std::vector<int> data_;
public:
  // vectorオブジェクトへのアクセスを排他的にする
  void add_value(int value)
  {
    std::lock_guard<std::mutex> lock(mtx_); // �ックを取得する(lock_guardのコンストラクタ)
    data_.push_back(value);
  } // �ックを手放す(lock_guardのデストラクタ)

  void print()
  {
    std::lock_guard<std::mutex> lock(mtx_);
    for (int x : data_) {
      safe_print(x);
    }
  }
};

int main()
{
  X x;

  std::thread t1([&x]{ x.add_value(1); });
  std::thread t2([&x]{ x.add_value(2); });

  t1.join();
  t2.join();

  x.print();
}
```
* std::lock_guard[color ff0000]
* data_.push_back[link /reference/vector/vector/push_back.md]

### 出力
```
1
2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 関連項目

- [`scoped_lock`](/reference/mutex/scoped_lock.md)
