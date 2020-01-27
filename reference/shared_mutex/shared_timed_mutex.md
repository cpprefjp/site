# shared_timed_mutex
* shared_mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  class shared_timed_mutex;
}
```

## 概要
`shared_timed_mutex`クラスは、[Readers–writer lock](https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock)パターンをサポートするミューテックスクラスである。

このパターンは、「複数のユーザーによる�み込みと、単一ユーザーによる書き込み」の排他制御を効率的に行う、というものである。

このミューテックスクラスの�ック取得方法は2種類ある。

- [`lock()`](shared_timed_mutex/lock.md)／[`unlock()`](shared_timed_mutex/unlock.md)メンバ関数：書き込み用の�ックを取得する
- [`lock_shared()`](shared_timed_mutex/lock_shared.md)／[`unlock_shared()`](shared_timed_mutex/unlock_shared.md)メンバ関数：�み込み用の�ックを取得する


このクラスは、デストラクタで自動的に�ックを手放すことはしない。そのため、以下の補助クラスを使用して、デストラクタで自動的に�ックを手放す。

- [`lock_guard`](/reference/mutex/lock_guard.md)クラス／[`unique_lock`](/reference/mutex/unique_lock.md)クラス：書き込み用の�ックを自動的に手放す
- [`shared_lock`](/reference/shared_mutex/shared_lock.md)：�み込み用の�ックを自動的に手放す

このクラスは、[`shared_mutex`](shared_mutex.md)クラスの機能に加えて、タイムアウト指定の機能を持つ。


## 備考
- このクラスは現状、書き込み�ックと�み込み�ックについてのスケジューリング戦略を規定せず、カスタマイズもできない。そのため、書き込み�ックがなかなか取得できない、�み込み�ックがなかなか取得できないというスタベーションの問題が発生した場合に、ユーザーの状況に合わせて戦略を変更することができない。POSIXのReaders-writer lockの実装では、スケジューリングのオプションを指定できる
    - [`pthread_rwlockattr_setkind_np()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/pthread_rwlockattr_setkind_np.3.html)


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------------------------|-------|
| [`(constructor)`](shared_timed_mutex/op_constructor.md) | コンストラクタ | C++14 |
| [`(destructor)`](shared_timed_mutex/op_destructor.md)   | デストラクタ | C++14 |
| `operator=(const shared_timed_mutex&) = delete;`          | 代入演算� | C++14 |


### 排他の所有権

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------------------------|-------|
| [`lock`](shared_timed_mutex/lock.md)           | 排他�ックを取得する | C++14 |
| [`try_lock`](shared_timed_mutex/try_lock.md)   | 排他�ックの取得を試みる | C++14 |
| [`try_lock_for`](shared_timed_mutex/try_lock_for.md)     | タイムアウトする相対時間を指定して排他�ックの取得を試みる | C++14 |
| [`try_lock_until`](shared_timed_mutex/try_lock_until.md) | タイムアウトする絶対時間を指定して排他�ックの取得を試みる | C++14 |
| [`unlock`](shared_timed_mutex/unlock.md)       | 排他�ックを手放す | C++14 |


### 共有の所有権

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------------------------|-------|
| [`lock_shared`](shared_timed_mutex/lock_shared.md)           | 共有�ックを取得する | C++14 |
| [`try_lock_shared`](shared_timed_mutex/try_lock_shared.md)   | 共有�ックの取得を試みる | C++14 |
| [`try_lock_shared_for`](shared_timed_mutex/try_lock_shared_for.md) | タイムアウトする相対時間を指定して共有�ックの取得を試みる | C++14 |
| [`try_lock_shared_until`](shared_timed_mutex/try_lock_shared_until.md) | タイムアウトする絶対時間を指定して共有�ックの取得を試みる | C++14 |
| [`unlock_shared`](shared_timed_mutex/unlock_shared.md)       | 共有�ックを手放す | C++14 |


## 例
```cpp example
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

  // �み込み側：カウンタの値を�む
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
  // �み込みユーザー3人
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
* std::shared_timed_mutex[color ff0000]
* std::shared_lock[link shared_lock.md]
* std::this_thread::sleep_for[link /reference/thread/this_thread/sleep_for.md]
* join()[link /reference/thread/thread/join.md]

### 出力例
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

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.5
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015


## 関連項目
- [`std::shared_mutex`](shared_mutex.md)


## 参照
- [Readers–writer lock - Wikipedia](https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock)
- [N3427 Shared locking in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3427.html)
- [N3568 Shared locking in C++ (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3568.html)
- [N3659 Shared locking in C++ (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3659.html)
- [N3891 A proposal to rename `shared_mutex` to `shared_timed_mutex`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3891.htm)

