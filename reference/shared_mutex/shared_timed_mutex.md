#shared_timed_mutex
* shared_mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  class shared_timed_mutex;
}
```

##概要
`shared_timed_mutex`クラスは、[Readers–writer lock](http://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock)パターンをサポートするミューテックスクラスである。

このパターンは、「複数のユーザーによる読み込みと、単一ユーザーによる書き込み」の排他制御を効率的に行う、というものである。

このミューテックスクラスのロック取得方法は2種類ある。

- [`lock()`](shared_timed_mutex/lock.md)／[`unlock()`](shared_timed_mutex/unlock.md)メンバ関数：書き込み用のロックを取得する
- [`lock_shared()`](shared_timed_mutex/lock_shared.md)／[`unlock_shared()`](shared_timed_mutex/unlock_shared.md)メンバ関数：読み込み用のロックを取得する


このクラスは、デストラクタで自動的にロックを手放すことはしない。そのため、以下の補助クラスを使用して、デストラクタで自動的にロックを手放す。

- [`lock_guard`](/reference/mutex/lock_guard.md)クラス／[`unique_lock`](/reference/mutex/unique_lock.md)クラス：書き込み用のロックを自動的に手放す
- [`shared_lock`](/reference/shared_mutex/shared_lock.md)：読み込み用のロックを自動的に手放す


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------------------------|-------|
| [`(constructor)`](shared_timed_mutex/op_constructor.md) | コンストラクタ | C++14 |
| [`(destructor)`](shared_timed_mutex/op_destructor.md)   | デストラクタ | C++14 |
| `operator=(const shared_timed_mutex&) = delete;`          | 代入演算子 | C++14 |


###排他の所有権

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------------------------|-------|
| [`lock`](shared_timed_mutex/lock.md)           | 排他ロックを取得する | C++14 |
| [`try_lock`](shared_timed_mutex/try_lock.md)   | 排他ロックの取得を試みる | C++14 |
| [`try_lock_for`](shared_timed_mutex/try_lock_for.md)     | タイムアウトする相対時間を指定して排他ロックの取得を試みる | C++14 |
| [`try_lock_until`](shared_timed_mutex/try_lock_until.md) | タイムアウトする絶対時間を指定して排他ロックの取得を試みる | C++14 |
| [`unlock`](shared_timed_mutex/unlock.md)       | 排他ロックを手放す | C++14 |


###共有の所有権

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------------------------|-------|
| [`lock_shared`](shared_timed_mutex/lock_shared.md)           | 共有ロックを取得する | C++14 |
| [`try_lock_shared`](shared_timed_mutex/try_lock_shared.md)   | 共有ロックの取得を試みる | C++14 |
| [`try_lock_shared_for`](shared_timed_mutex/try_lock_shared_for.md) | タイムアウトする相対時間を指定して共有ロックの取得を試みる | C++14 |
| [`try_lock_shared_until`](shared_timed_mutex/try_lock_shared_until.md) | タイムアウトする絶対時間を指定して共有ロックの取得を試みる | C++14 |
| [`unlock_shared`](shared_timed_mutex/unlock_shared.md)       | 共有ロックを手放す | C++14 |


##例
```cpp
#include <iostream>
#include <thread>
#include <shared_mutex>
#include <chrono>

std::mutex print_mtx;
void print_value(int x)
{
  std::lock_guard<std::mutex> lock(print_mtx);
  std::cout << x << std::endl;
}

class X {
  std::shared_timed_mutex mtx_;
  int count_ = 0;
public:
  // 書き込み側：カウンタを加算する
  void writer()
  {
    std::lock_guard<std::shared_timed_mutex> lock(mtx_);
    ++count_;
  }

  // 読み込み側：カウンタの値を読む
  void reader()
  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx_);
    print_value(count_);
  }
};

X obj;
void writer_thread()
{
  for (int i = 0; i < 3; ++i) {
    std::this_thread::sleep_for(std::chrono::milliseconds(1));
    obj.writer();
  }
}

void reader_thread()
{
  for (int i = 0; i < 10; ++i) {
    std::this_thread::sleep_for(std::chrono::milliseconds(1));
    obj.reader();
  }
}

int main()
{
  // 書き込みユーザー1人
  // 読み込みユーザー3人
  std::thread writer1(writer_thread);
  std::thread reader1(reader_thread);
  std::thread reader2(reader_thread);
  std::thread reader3(reader_thread);

  writer1.join();
  reader1.join();
  reader2.join();
  reader3.join();
}
```
* std::mutex[link /reference/mutex/mutex.md]
* std::lock_guard[link /reference/mutex/lock_guard.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]
* std::shared_lock[link shared_lock.md]
* sleep_for[link /reference/thread/this_thread/sleep_for.md]
* milliseconds[link /reference/chrono/milliseconds.md]
* std::thread[link /reference/thread/thread.md]
* join()[link /reference/thread/thread/join.md]

###出力例
```
1
1
1
2
2
2
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++14 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 14.0


##参照
- [Readers–writer lock - Wikipedia](http://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock)
- [N3427 Shared locking in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3427.html)
- [N3568 Shared locking in C++ (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3568.html)
- [N3659 Shared locking in C++ (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3659.html)
- [N3891 A proposal to rename `shared_mutex` to `shared_timed_mutex`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3891.htm)

