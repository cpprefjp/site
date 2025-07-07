# uninitialized_fill
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class T>
  void
    uninitialized_fill(ForwardIterator first,
                       ForwardIterator last,
                       const T& x);           // (1) C++03
  template <class ForwardIterator, class T>
  constexpr void
    uninitialized_fill(ForwardIterator first,
                       ForwardIterator last,
                       const T& x);           // (1) C++26

  template <class ExecutionPolicy, class ForwardIterator, class T>
  void
    uninitialized_fill(ExecutionPolicy&& exec,
                       ForwardIterator first,
                       ForwardIterator last,
                       const T& x);           // (2) C++17
}
```

## 概要
未初期化領域の範囲を、指定された値で配置`new`する。

未初期化入力イテレータ範囲`[first, last)`を初期化しつつ値`x`で埋める。


## 効果
- C++03 : 以下と等価
    ```cpp
    for (; first != last; ++first)
      ::new (static_cast<void*>(&*first))
         typename iterator_traits<ForwardIterator>::value_type(x);
    ```

- C++17 : 以下と等価
    ```cpp
    for (; first != last; ++first)
      ::new (static_cast<void*>(addressof(*first)))
         typename iterator_traits<ForwardIterator>::value_type(x);
    ```


## 戻り値
なし

## 例外

呼び出すコンストラクタなどから例外がスローされた場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外がスローされた場合は初期化対象領域は未初期化のままとなる。

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
* std::uninitialized_fill[color ff0000]
* alloc.allocate[link allocator/allocate.md]
* alloc.destroy[link allocator/destroy.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
2
2
2
```


## 関連項目
- [`ranges::uninitialized_fill`](ranges_uninitialized_fill.md)


## 参照
- [LWG Issue 2433 `uninitialized_copy()`/etc. should tolerate overloaded `operator&`](https://wg21.cmeerw.net/lwg/issue2433)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
    - C++26から`constexpr`がついた
