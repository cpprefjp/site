# atomic_init
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  void atomic_init(volatile atomic<T>* object,
                   T desired) noexcept;                              // (1) C++11

  template <class T>
  void atomic_init(volatile atomic<T>* object,
                   typename atomic<T>::value_type desired) noexcept; // (1) C++17

  template <class T>
  void atomic_init(atomic<T>* object,
                   T desired) noexcept;                              // (2) C++11

  template <class T>
  void atomic_init(atomic<T>* object,
                   typename atomic<T>::value_type desired) noexcept; // (2) C++17
}
```
* atomic[link /reference/atomic/atomic.md]


## 概要
アトミックオブジェクトを初期化する


## 効果
この関数は、アトミックオブジェクト`object`を値`desired`で非アトミックに初期化する。この関数は、デフォルト構築されたオブジェクトに対して一度だけ呼びださなければならない。変数の初期化中に並行アクセスされた場合、それがアトミックな操作であったとしてもデータ競合を引き起こす。


## 戻り値
なし


## 例外
投げない


## 備考
この関数は、C言語との互換性のために存在している。


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x;
  std::atomic_init(&x, 1);

  std::cout << x.load() << std::endl;
}
```
* std::atomic_init[color ff0000]
* x.load()[link atomic/load.md]

### 出力
```
1
```


## バージョン
### 言語
- C++11

### 処理系

- [Clang, C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
