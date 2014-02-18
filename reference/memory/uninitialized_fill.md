#uninitialized_fill
```cpp
namespace std {
  template <class ForwardIterator, class T>
  void uninitialized_fill(ForwardIterator first, ForwardIterator last,
                          const T& x);
}
```

##概要
未初期化領域の範囲を、指定された値で配置`new`する。

未初期化入力範囲`[first, last)`を初期化しつつ値`x`で埋める。


##効果

```cpp
for (; first != last; ++first)
  ::new (static_cast<void*>(&*first))
    typename iterator_traits<ForwardIterator>::value_type(x);
```
* iterator_traits[link /reference/iterator/iterator_traits.md]


##戻り値
なし


###例
```cpp
#include <iostream>
#include <memory>
#include <algorithm>

int main()
{
  std::allocator<int> alloc;

  // メモリ確保。
  // この段階では、[p, p + size)の領域は未初期化
  const std::size_t size = 3;
  int* p = alloc.allocate(size);

  // 未初期化領域pを初期化しつつ、値2で埋める
  std::uninitialized_fill(p, p + size, 2);

  // pの領域が初期化され、かつ範囲pの全ての要素が2で埋められているか確認
  std::for_each(p, p + size, [](int x) {
    std::cout << x << std::endl;
  });

  // 要素を破棄
  for (std::size_t i = 0; i < size; ++i) {
    alloc.destroy(p + i);
  }

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* uninitialized_fill[color ff0000]

###出力
```
2
2
2
```


