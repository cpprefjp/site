# uninitialized_fill_n
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class Size, class T>
  ForwardIterator
    uninitialized_fill_n(ForwardIterator first,
                         Size n,
                         const T& x);           // (1) C++03

  template <class ExecutionPolicy, class ForwardIterator, class Size, class T>
  ForwardIterator
    uninitialized_fill_n(ExecutionPolicy&& exec,
                         ForwardIterator first,
                         Size n,
                         const T& x);           // (2) C++17
}
```

## 概要
未初期化領域の範囲のうち、先�`N`個の要素を指定された値で配置`new`する。

未初期化入力範囲`[first, first + n)`を初期化しつつ値`x`で埋める。


## 効果
- C++03 : 以下と�価
    ```cpp
    for (; n--; ++first)
      ::new (static_cast<void*>(&*first))
         typename iterator_traits<ForwardIterator>::value_type(x);
    ```
    * iterator_traits[link /reference/iterator/iterator_traits.md]

- C++17 : 以下と�価
    ```cpp
    for (; n--; ++first)
      ::new (static_cast<void*>(addressof(*first)))
         typename iterator_traits<ForwardIterator>::value_type(x);
    ```
    * iterator_traits[link /reference/iterator/iterator_traits.md]
    * addressof[link addressof.md]


## 戻り値
`first`


### 例
```cpp example
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
* std::uninitialized_fill_n[color ff0000]
* std::allocator[link allocator.md]
* alloc.allocate[link allocator/allocate.md]
* alloc.destroy[link allocator/destroy.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
2
2
2
```


## 参照
- [LWG Issue 2433 `uninitialized_copy()`/etc. should tolerate overloaded `operator&`](https://wg21.cmeerw.net/lwg/issue2433)
