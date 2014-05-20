#uninitialized_copy_n (C++11)
```cpp
namespace std {
  template <class InputIterator, class Size, class ForwardIterator>
  ForwardIterator uninitialized_copy_n(InputIterator first, Size n,
                                       ForwardIterator result);
}
```

##概要
未初期化領域の範囲のうち、先頭`N`個の要素を配置`new`で初期化して出力する。

入力範囲`[first, first + n)`のコピーを未初期化出力範囲`[result, result + n)`に書き込む。


##効果

```cpp
for ( ; n > 0; ++result, ++first, --n) {
  ::new (static_cast<void*>(&*result))
    typename iterator_traits<ForwardIterator>::value_type(*first);
}
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
  std::uninitialized_copy_n(v.begin(), size, p);

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
* uninitialized_copy_n[color ff0000]

###出力
```
1
2
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
