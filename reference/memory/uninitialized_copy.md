#uninitialized_copy
```cpp
namespace std {
  template <class InputIterator, class ForwardIterator>
  ForwardIterator uninitialized_copy(InputIterator first, InputIterator last,
                                     ForwardIterator result);
}
```

##概要
未初期化領域の範囲を配置`new`で初期化して出力する。

入力範囲`[first, last)`のコピーを未初期化出力範囲`[result, )`に書き込む。


##効果

```cpp
for (; first != last; ++result, ++first)
  ::new (static_cast<void*>(&*result))
    typename iterator_traits<ForwardIterator>::value_type(*first);
```
* iterator_traits[link /reference/iterator/iterator_traits.md]


##戻り値
`result`


###例
```cpp
#include <iostream>
#include <memory>

#include <vector>
#include <algorithm>

int main()
{
  const std::vector<int> v = {1, 2, 3};

  std::allocator<int> alloc;

  // メモリ確保。
  // この段階では、[p, p + size)の領域は未初期化
  const std::size_t size = 3;
  int* p = alloc.allocate(size);

  // 未初期化領域pを初期化しつつ範囲vから要素をコピー
  std::uninitialized_copy(v.begin(), v.end(), p);

  // pの領域が初期化され、かつvからpに要素がコピーされているか確認
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
* uninitialized_copy[color ff0000]

###出力
```
1
2
3
```


