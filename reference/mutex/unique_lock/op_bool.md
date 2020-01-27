# operator bool
* mutex[meta header]
* std[meta namespace]
* unique_lock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit operator bool() const noexcept;
```

## 概要
�ックを取得しているかを確認する


## 戻り値
�ックが取得済みであれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk(mtx);

    // コンストラクタで�ック取得されるので、boolへの変換はtrueとなる
    if (lk) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }
  }

  {
    std::unique_lock<std::mutex> lk(mtx, std::defer_lock);

    // 遅延�ックのためコンストラクタで�ック取得されないので、
    // boolへの変換はfalseとなる
    if (!lk) {
      std::cout << "unlocked" << std::endl;
    }
    else {
      assert(false);
    }

    lk.lock();

    // �ック取得後なので、boolへの変換はtrueとなる
    if (lk) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }
  }
}
```
* if (lk)[color ff0000]
* if (!lk)[color ff0000]

### 出力
```cpp
locked
unlocked
locked
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


