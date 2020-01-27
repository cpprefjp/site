# owns_lock
* mutex[meta header]
* std[meta namespace]
* unique_lock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool owns_lock() const noexcept;
```

## 概要
�ックを取得しているかを確認する


## 戻り値
�ックが取得済みであれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk(mtx);

    // コンストラクタで�ック取得されるのでowns_lock() == true
    assert(lk.owns_lock());
  }

  {
    std::unique_lock<std::mutex> lk(mtx, std::defer_lock);

    // 遅延�ックのためコンストラクタで�ック取得されないので、
    // owns_lock() == false
    assert(!lk.owns_lock());

    lk.lock();

    // �ック取得後なのでowns_lock() == true
    assert(lk.owns_lock());
  }
}
```
* owns_lock[color ff0000]
* lk.lock()[link lock.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照


