#lock (C++11)
```cpp
namespace std {
  template <class L1, class L2, class... L3>
  void lock(L1&, L2&, L3&...);
}
```

##概要
複数のミューテックスオブジェクトに対してlock操作を行う


##要件
テンプレートパラメータの型が`lock()`、`unlock()`、`try_lock()`メンバ関数をサポートしていること


##効果
各ミューテックスオブジェクトに対して、`lock()`、`try_lock()`、あるいは`unlock()`メンバ関数を順次呼び出すことで、デッドロックを引き起こさずに全ミューテックスをロックする。 
いずれかの`lock()`/`try_lock()`が例外を送出した場合、以降の`lock()`/`try_lock()`呼び出しを行わず、それ以前にロック取得したミューテックスオブジェクトに対して`unlock()`メンバ関数を呼び出す。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <cassert>
#include <mutex>

int main()
{
  std::mutex mtx1;
  std::recursive_mutex mtx2;

  // 複数のミューテックスオブジェクトのロック取得を行う
  {
    std::lock(mtx1, mtx2);

    mtx1.unlock();
    mtx2.unlock();
  }

  // unique_lockに対してロック取得を行う
  {
    std::unique_lock<std::mutex> lk1(mtx1, std::defer_lock);
    std::unique_lock<std::recursive_mutex> lk2(mtx2, std::defer_lock);

    std::lock(lk1, lk2);
  }

  // 一部のlock()が失敗する場合
  {
    std::unique_lock<std::mutex> lk1(mtx1, std::defer_lock);
    std::unique_lock<std::recursive_mutex> lk2(mtx2, std::defer_lock);

    lk2.lock(); // ロック取得済みにしてlock()に渡す

    try {
      std::lock(lk1, lk2);
    }
    catch (std::system_error& e) {
      std::cout << e.what() << std::endl;
    }

    // lk2が失敗したので、std::lock()内でlk2より前にロック取得が
    // 成功した全てのミューテックスオブジェクトがunlock()される
    assert(!lk1.owns_lock());

    // lk2はロック取得済みで渡したので、ロック取得済み状態のまま
    assert(lk2.owns_lock());
  }
}
```
* std::lock[color ff0000]

###出力例
```
Resource deadlock avoided
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
- [lock非メンバ関数の使いどころ - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120919/p1)
- [Acquiring Multiple Locks Without Deadlock](http://www.justsoftwaresolutions.co.uk/threading/acquiring-multiple-locks-without-deadlock.html)


