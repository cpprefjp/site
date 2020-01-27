# operator bool
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
explicit operator bool() const noexcept;
```

## 概要
共有�ックを取得しているかを確認する


## 戻り値
共有�ックを取得済みであれば`true`、そうでなければ`false`を返す。

## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx);

    // コンストラクタで共有�ックが取得されるので、
    // boolへの変換はtrueとなる
    if (lock) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }
  } // 共有�ックを手放す(shared_lockのデストラクタ)

  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx, std::defer_lock);

    // 遅延�ックのため、コンストラクタで共有�ックが取得されないので、
    // boolへの変換はfalseとなる
    if (!lock) {
      std::cout << "unlocked" << std::endl;
    }
    else {
      assert(false);
    }

    lock.lock();

    // 共有�ック取得後なので、
    // boolへの変換はtrueとなる
    if (lock) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }
  } // 共有�ックを手放す(shared_lockのデストラクタ)
}
```
* if (lock)[color ff0000]
* if (!lock)[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* lock.lock()[link /reference/shared_mutex/shared_timed_mutex/lock.md]
* lock.unlock()[link /reference/shared_mutex/shared_timed_mutex/unlock.md]

### 出力
```cpp
locked
unlocked
locked
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.5
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015
