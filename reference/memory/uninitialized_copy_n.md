# uninitialized_copy_n
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class Size, class ForwardIterator>
  ForwardIterator
    uninitialized_copy_n(InputIterator first,
                         Size n,
                         ForwardIterator result); // (1) C++11

  template <class InputIterator, class Size, class ForwardIterator>
  ForwardIterator
    uninitialized_copy_n(InputIterator first,
                         Size n,
                         ForwardIterator result); // (2) C++17
}
```

## 概要
未初期化領域の範囲のうち、先�`N`個の要素を配置`new`で初期化してコピー出力する。

入力範囲`[first, first + n)`のコピーを未初期化出力範囲`[result, result + n)`に書き込む。


## 効果
- C++11 : 以下と�価
    ```cpp
    for ( ; n > 0; ++result, ++first, --n) {
      ::new (static_cast<void*>(&*result))
        typename iterator_traits<ForwardIterator>::value_type(*first);
    }
    ```
    * iterator_traits[link /reference/iterator/iterator_traits.md]

- C++17 : 以下と�価
    ```cpp
    for ( ; n > 0; ++result, ++first, --n) {
      ::new (static_cast<void*>(addressof(*result)))
        typename iterator_traits<ForwardIterator>::value_type(*first);
    }
    ```
    * iterator_traits[link /reference/iterator/iterator_traits.md]
    * addressof[link addressof.md]


## 戻り値
`result`


### 例
```cpp example
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
* std::uninitialized_copy_n[color ff0000]
* std::allocator[link allocator.md]
* alloc.allocate[link allocator/allocate.md]
* alloc.destroy[link allocator/destroy.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)
- [LWG Issue 2433 `uninitialized_copy()`/etc. should tolerate overloaded `operator&`](https://wg21.cmeerw.net/lwg/issue2433)
