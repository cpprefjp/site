# shared_lock
* shared_mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class Mutex>
  class shared_lock;
}
```

## 概要
`shared_lock`は、共有ミューテックスの`lock_shared()`／`unlock_shared()`処理を、コンストラクタとデストラクタで確実に実行するためのクラスである。

このクラスは、排他�ックを自動的に手放す[`lock_guard`](/reference/mutex/lock_guard.md)クラス、[`unique_lock`](/reference/mutex/unique_lock.md)クラスと組み合わせて使用する。

- 排他�ック(書き込み�ック、`lock()`／`unlock()`)を自動的に手放すために[`lock_guard`](/reference/mutex/lock_guard.md)クラス、[`unique_lock`](/reference/mutex/unique_lock.md)クラスを使用する。
- 共有�ック(�み込み�ック、`lock_shared()`／`unlock_shared()`)を自動的に手放すために、このクラスを使用する。

このクラスは、メンバ変数で保持しているミューテックスオブジェクトを、メンバ関数のスコープで�ック取得し、手放すというようにして使用する。この手法は、[Scoped Locking Pattern](http://www.cs.wustl.edu/~schmidt/PDF/ScopedLocking.pdf)として知られている。

テンプレートパラメータ`Mutex`は、`lock_shared()`／`unlock_shared()`メンバ関数を持つあらゆるミューテックスクラスを扱うためのものである。ミューテックス型をパラメータ化するScoped Locking手法は、[Strategized Locking Pattern](http://wiki.hsr.ch/PnProg/files/StrategizedLocking.pdf)として知られている。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|--------------------------------------------------------|-------|
| [`(constructor)`](shared_lock/op_constructor.md)  | コンストラクタ | C++14 |
| [`(destructor)`](shared_lock/op_destructor.md)    | デストラクタ | C++14 |
| [`operator=`](shared_lock/op_assign.md)           | 代入演算� | C++14 |
| [`lock`](shared_lock/lock.md)                     | 共有�ックを取得する | C++14 |
| [`try_lock`](shared_lock/try_lock.md)             | 共有�ックの取得を試みる | C++14 |
| [`try_lock_for`](shared_lock/try_lock_for.md)     | タイムアウトする相対時間を指定して共有�ックの取得を試みる | C++14 |
| [`try_lock_until`](shared_lock/try_lock_until.md) | タイムアウトする絶対時間を指定して共有�ックの取得を試みる | C++14 |
| [`unlock`](shared_lock/unlock.md)                 | 共有�ックを手放す | C++14 |
| [`swap`](shared_lock/swap.md)                     | 他の`shared_lock`オブジェクトと値を入れ替える | C++14 |
| [`release`](shared_lock/release.md)               | ミューテックスの所有権を放棄する | C++14 |
| [`owns_lock`](shared_lock/owns_lock.md)           | �ックを取得しているかを判定する | C++14 |
| [`operator bool`](shared_lock/op_bool.md)         | �ックを取得しているかを判定する | C++14 |
| [`mutex`](shared_lock/mutex.md)                   | 所有しているミューテックスオブジェクトを取得する | C++14 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|-------------------------|-------|
| `mutex_type` | ミューテックス型`Mutex` | C++14 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------|--------------------------------------------|-------|
| [`swap`](shared_lock/swap_free.md) | 2つの`shared_lock`オブジェクトを入れ替える | C++14 |


## 例
```cpp example
#include <iostream>
#include <shared_mutex>

class X {
  mutable std::shared_timed_mutex mutex_;
  int value_ = 0;
public:
  int read_access() const
  {
    // lockのコンストラクタで、自動的にmutex_.lock_shared()を呼び出す
    std::shared_lock<std::shared_timed_mutex> lock(mutex_);
    return value_;
  } // lockのデストラクタで、自動的にmutex_.unlock_shared()を呼び出す
};

int main()
{
  X x;
  int value = x.read_access();

  std::cout << value << std::endl;
}
```
* std::shared_lock[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]

### 出力
```
0
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照
- [Readers–writer lock - Wikipedia](https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock)
- [N3427 Shared locking in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3427.html)
- [N3568 Shared locking in C++ (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3568.html)
- [N3659 Shared locking in C++ (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3659.html)
- [N3891 A proposal to rename `shared_mutex` to `shared_timed_mutex`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3891.htm)


## 関連項目
- [`shared_timed_mutex`](shared_timed_mutex.md) : 共有ミューテックスクラス
- [`lock_guard`](/reference/mutex/lock_guard.md) : 排他�ックを自動的に手放す
- [`unique_lock`](/reference/mutex/unique_lock.md) : 排他�ックを自動的に手放す


