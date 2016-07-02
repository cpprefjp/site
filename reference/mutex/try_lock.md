#try_lock
* mutex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class L1, class L2, class... L3>
  int try_lock(L1&, L2&, L3&...);
}
```

##概要
複数のミューテックスオブジェクトに対してtry_lock操作を行う


##要件
テンプレートパラメータの型が`lock()`、`unlock()`、`try_lock()`メンバ関数をサポートしていること


##効果
各ミューテックスオブジェクトに、引数の順に`try_lock()`メンバ関数を呼び出す。

いずれかの`try_lock()`が`false`を返すか、もしくは例外を送出した場合、以降の`try_lock()`呼び出しを行わず、それ以前にロック取得したミューテックスオブジェクトに対して`unlock()`メンバ関数を呼び出す。


##戻り値
全てのミューテックスオブジェクトへの`try_lock()`が成功した場合、`-1`を返す。

いずれかの`try_lock()`が失敗して終了した場合、失敗した最初のミューテックスオブジェクトへの`0`から始まるインデックスを返す。


##例
```cpp
#include <cassert>
#include <mutex>

int main()
{
  std::mutex mtx1;
  std::recursive_mutex mtx2;

  // 複数のミューテックスオブジェクトに対してtry_lock()を呼び出す
  {
    int result = std::try_lock(mtx1, mtx2);

    assert(result == -1); // 全てのtry_lock()呼び出しが成功

    mtx1.unlock();
    mtx2.unlock();
  }

  // unique_lockに対してtry_lock()を呼び出す
  {
    std::unique_lock<std::mutex> lk1(mtx1, std::defer_lock);
    std::unique_lock<std::recursive_mutex> lk2(mtx2, std::defer_lock);

    int result = std::try_lock(lk1, lk2);

    assert(result == -1); // 全てのtry_lock()呼び出しが成功
  }

  // 一部のtry_lock()が失敗する場合
  {
    // mtx2をロックしておく。
    std::lock_guard<std::recursive_mutex> lk2_main_thread(mtx2);

    std::thread th([&]
    {
      std::unique_lock<std::mutex> lk1(mtx1, std::defer_lock);
      std::unique_lock<std::recursive_mutex> lk2(mtx2, std::defer_lock);

      // 他のスレッドでmtx2をロックしているため、lk2のロックに失敗する。
      int result = std::try_lock(lk1, lk2);

      // lk2が失敗したので第2引数を示す1が返る(0始まり)
      assert(result == 1);

      // lk2が失敗したので、std::try_lock()内でlk2より前にtry_lock()が
      // 成功した全てのミューテックスオブジェクトがunlock()される
      assert(!lk1.owns_lock());
    });
    th.join();
  }
}
```
* std::try_lock[color ff0000]
* assert[link /reference/cassert/assert.md]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


##参照
- [lock非メンバ関数の使いどころ - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120919/p1)
- [Acquiring Multiple Locks Without Deadlock](http://www.justsoftwaresolutions.co.uk/threading/acquiring-multiple-locks-without-deadlock.html)


