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
`lock_guard`は、ミューテックスの`lock()`/`unlock()`処理をコンストラクタとデストラクタで確実に実行するためのクラスである。このクラスは通常、メンバ変数もしくはグローバル変数としてもつミューテックスオブジェクトに対し、ブロックスコープの先頭で`lock()`を呼び出し、同ブロックスコープを抜ける際に`unlock()`を確実に呼び出すために使用される。この手法は、[Scoped Locking Pattern](https://www.dre.vanderbilt.edu/~schmidt/PDF/ScopedLocking.pdf)として知られている。

テンプレートパラメータ`Mutex`は、`lock()`/`unlock()`メンバ関数を持つあらゆるミューテックスクラスを扱うためのものである。ミューテックス型をパラメータ化するScoped Locking手法は、[Strategized Locking Pattern](https://www.dre.vanderbilt.edu/~schmidt/PDF/locking-patterns.pdf)として知られている。

`lock_guard`は、非常にシンプルな機能「コンストラクタでロックを取得/ロック済みミューテックスを受け取る」「デストラクタでロックを手放す」しか提供しないが、使用メモリや実行時処理に関するオーバーヘッドは小さい（ほぼゼロ）。一方で、より高度なミューテックスのロック操作が必要な場合は[`unique_lock`](/reference/mutex/unique_lock.md)を利用する。

なお、C++17では複数のミューテックスを正しく簡便に扱うために[`scoped_lock`](/reference/mutex/scoped_lock.md)が追加されている。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|----------------|-------|
| [`(constructor)`](lock_guard/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](lock_guard/op_destructor.md) | デストラクタ   | C++11 |
| `operator=(const lock_guard&) = delete`       | 代入演算子     | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|-------------------------|-------|
| `mutex_type` | ミューテックス型`Mutex` | C++11 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <thread>
#include <mutex>

// std::coutへのアクセスを排他的にする
std::mutex print_mtx_;
void safe_print(int x)
{
  std::lock_guard<std::mutex> lock{print_mtx_};
  std::cout << "value:" << x << std::endl;
}

int main()
{
  std::thread t1([]{
    for (int i = 0; i < 5; i++) {
      safe_print(i);
    }
  });
  std::thread t2([]{
    for (int i = 0; i < 5; i++) {
      safe_print(5 + i);
    }
  });

  t1.join();
  t2.join();
}
```
* std::lock_guard[color ff0000]

#### 出力例
```
value:5
value:6
value:7
value:8
value:9
value:0
value:1
value:2
value:3
value:4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 14 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

## 関連項目
- [`scoped_lock`](/reference/mutex/scoped_lock.md)
- [C++26 宣言のみで使用しない変数の名前として_をサポート](/lang/cpp26/nice_placeholder_with_no_name.md)
