#uninitialized_fill_n
* memory[meta header]

```cpp
namespace std {
  template <class ForwardIterator, class Size, class T>
  ForwardIterator uninitialized_fill_n(ForwardIterator first, Size n, const T& x);
}
```

##概要
未初期化領域の範囲のうち、先頭`N`個の要素を指定された値で配置`new`する。

未初期化入力範囲`[first, first + n)`を初期化しつつ値`x`で埋める。


##効果

```cpp
for (; n--; ++first)
  ::new (static_cast<void*>(&*first))
    typename iterator_traits<ForwardIterator>::value_type(x);
```
* iterator_traits[link /reference/iterator/iterator_traits.md]


##戻り値
`first`


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

  // 未初期化領域の範囲[p, p + size)を初期化しつつ、値2で埋める
  std::uninitialized_fill_n(p, size, 2);

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
* uninitialized_fill_n[color ff0000]

###出力
```
2
2
2
```


