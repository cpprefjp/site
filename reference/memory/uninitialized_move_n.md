# uninitialized_move_n
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class Size, class ForwardIterator>
  pair<InputIterator, ForwardIterator>
    uninitialized_move_n(InputIterator first,
                         Size n,
                         ForwardIterator result); // (1)

  template <class ExecutionPolicy, class InputIterator, class Size, class ForwardIterator>
  pair<InputIterator, ForwardIterator>
    uninitialized_move_n(ExecutionPolicy&& exec,
                         InputIterator first,
                         Size n,
                         ForwardIterator result); // (2)
}
```

## 概要
未初期化領域の範囲のうち先�`N`個の要素を配置`new`で初期化してムーブ出力する。

入力範囲`[first, first + n)`からムーブして未初期化出力範囲`[result, )`に書き込む。


## 効果
以下と�価：

```cpp
for (; n > 0; ++result, (void)++first, --n)
  ::new (static_cast<void*>(addressof(*result)))
    typename iterator_traits<ForwardIterator>::value_type(std::move(*first));
```
* iterator_traits[link /reference/iterator/iterator_traits.md]
* addressof[link addressof.md]
* std::move[link /reference/utility/move.md]


## 戻り値
`{first, result}`


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

  // 未初期化領域pを初期化しつつ範囲vから要素をムーブ
  std::uninitialized_move_n(v.begin(), v.size(), p);

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
* std::uninitialized_move_n[color ff0000]
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
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0040R3 Extending memory management tools](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0040r3.html)
