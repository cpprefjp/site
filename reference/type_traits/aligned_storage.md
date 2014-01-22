#aligned_storage(C++11)
```cpp
namespace std {
  template <std::size_t Len,
            std::size_t Align = default-alignment>
  struct aligned_storage {
    typedef … type;
  };
}
```
* default-alignment[italic]

##概要
アラインメント調整された領域を作る。


##要件
`Len`が非ゼロであること。`Align`は、得ようとしてる領域の要素型`T`に対する`alignof(T)`と同じ大きさか、もしくはデフォルト値であること。


##効果
`aligned_storage`は、領域サイズ`Len`、アラインメント`Align`で調整した未初期化領域をメンバ型`type`として定義する。  
メンバ型`type`はPOD型となる(参照：[`is_pod`](./is_pod.md))。  

`Align`のデフォルト値は、`Len`よりも大きくない、最も厳格なアラインメント要件を持つ、C++の何らかのオブジェクト型のアラインメント値。


##例
```cpp
#include <iostream>
#include <type_traits>

template <class T, std::size_t Capacity>
class StackContainer {
  // 長さ：sizeof(T) * Count、
  // アラインメント：alignof(T)
  // でアラインメント調整された領域を作る
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

###出力
```
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.4
- [Visual C++](/implementation#visual_cpp.md): ??


