# atomic_is_lock_free
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  bool atomic_is_lock_free(const volatile atomic<T>* object) noexcept; // (1)

  template <class T>
  bool atomic_is_lock_free(const atomic<T>* object) noexcept;          // (2)
}
```
* atomic[link atomic.md]


## 概要
オブジェクトが�ックフリーに振る舞えるかを判定する


## 戻り値
オブジェクトに対する操作が�ックフリーに振る舞えるなら`true`、そうでなければ`false`を返す。

`false`を返す場合は、�ックで実装されることを意味する。

## 例外
投げない


## 備考
この関数は、特殊化された[`atomic`](atomic.md)型に対して定義される。


## 例

```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  if (std::atomic_is_lock_free(&x)) {
    std::cout << "atomic<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "atomic<int> isn't lock-free" << std::endl;
  }
}
```
* std::atomic_is_lock_free[color ff0000]

### 出力例
```
atomic<int> is lock-free
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 関連項目
- [`std::atomic`](atomic.md)クラスの`is_always_lock_free`メンバ定数


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
