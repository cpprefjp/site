# aligned_storage
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <std::size_t Len,
            std::size_t Align = default-alignment>
  struct aligned_storage {
    using type = …;
  };

  template <std::size_t Len,
            std::size_t Align = default-alignment>
  using aligned_storage_t = typename aligned_storage<Len,Align>::type; // C++14
}
```
* default-alignment[italic]

## 概要
アライメント調整された領域を作る。


## 要件
`Len`が非ゼロであること。`Align`は、得ようとしてる領域の要素型`T`に対する`alignof(T)`と同じ大きさか、もしくはデフォルト値であること。


## 効果
- `aligned_storage`は、領域サイズ`Len`、アライメント`Align`で調整した未初期化領域をメンバ型`type`として定義する。
- メンバ型`type`はPOD型となる(参照：[`is_pod`](is_pod.md))。

`Align`のデフォルト値は、`Len`よりも大きくない、最も厳格なアライメント要件を持つ、C++の何らかのオブジェクト型のアラインメント値。


## 例
```cpp example
#include <iostream>
#include <type_traits>

template <class T, std::size_t Capacity>
class StackContainer {
  // 長さ：sizeof(T) * Count、
  // アライメント：alignof(T)
  // でアライメント調整された領域を作る
  typename
    std::aligned_storage<sizeof(T) * Capacity, alignof(T)>::type
  storage;

  std::size_t size_ = 0;

  T* data()
  {
    return static_cast<T*>(static_cast<void*>(&storage));
  }

public:
  void push(T value)
  {
    // 未初期化領域に要素を作る
    new (data() + size_) T(value);
    ++size_;
  }

  T& front()
  {
    return *data();
  }

  ~StackContainer()
  {
    for (std::size_t i = 0; i < size_; ++i) {
      (data() + i)->~T();
    }
  }
};

int main()
{
  StackContainer<int, 3> cont;
  cont.push(1);

  std::cout << cont.front() << std::endl;
}
```
* std::aligned_storage[color ff0000]

### 出力
```
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.5.4
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012, 2013, 2015
	- 2010までは、`Align`のデフォルト実引数が定義されていない。
	- 2012からは、`Align`のデフォルト実引数は`std::alignment_of<max_align_t>::value`と定義されている。
	- `aligned_storage_t`は2013から


## 参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

