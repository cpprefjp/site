# uninitialized_copy
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class ForwardIterator>
  ForwardIterator
    uninitialized_copy(InputIterator first,
                       InputIterator last,
                       ForwardIterator result); // (1) C++03

  template <class ExecutionPolicy, class InputIterator, class ForwardIterator>
  ForwardIterator
    uninitialized_copy(ExecutionPolicy&& exec,
                       InputIterator first,
                       InputIterator last,
                       ForwardIterator result); // (2) C++17
}
```

## 概要
未初期化領域の範囲を配置`new`で初期化してコピー出力する。

入力範囲`[first, last)`のコピーを未初期化出力範囲`[result, )`に書き込む。

## 事前条件

- イテレータ範囲`[result, result + (last - first))`が`[first, last)`と重ならないこと

## 効果
- C++03 : 以下と等価
    ```cpp
    for (; first != last; ++result, ++first)
      ::new (static_cast<void*>(&*result))
        typename iterator_traits<ForwardIterator>::value_type(*first);
    ```
    * iterator_traits[link /reference/iterator/iterator_traits.md]

- C++17 : 以下と等価
    ```cpp
    for (; first != last; ++result, ++first)
      ::new (static_cast<void*>(addressof(*result)))
        typename iterator_traits<ForwardIterator>::value_type(*first);
    ```
    * iterator_traits[link /reference/iterator/iterator_traits.md]
    * addressof[link addressof.md]


## 戻り値
`result`

## 例外

呼び出すコンストラクタなどから例外がスローされた場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外がスローされた場合は初期化対象領域は未初期化のままとなる。


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
* std::uninitialized_copy[color ff0000]
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


## 関連項目
- [`ranges::uninitialized_copy`](ranges_uninitialized_copy.md)


## 参照
- [LWG Issue 2433 `uninitialized_copy()`/etc. should tolerate overloaded `operator&`](https://wg21.cmeerw.net/lwg/issue2433)
