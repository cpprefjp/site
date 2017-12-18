# is_lock_free
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool is_lock_free() const volatile noexcept;
bool is_lock_free() const noexcept;
```

## 概要
オブジェクトに対する操作がロックフリーに振る舞えるかを判定する


## 戻り値
オブジェクトに対する操作がロックフリーに振る舞えるなら`true`、そうでなければ`false`を返す。

`false`を返す場合は、ロックで実装されることを意味する。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  if (x.is_lock_free()) {
    std::cout << "atomic<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "atomic<int> isn't lock-free" << std::endl;
  }
}
```
* is_lock_free[color ff0000]


### 出力例
```
atomic<int> is lock-free
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 関連項目
- [`std::atomic`](atomic.md)クラスの`is_always_lock_free`メンバ定数


## 参照
[N2992 More Collected Issues with Atomics - Lock Free](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2992.htm#lockfree)

