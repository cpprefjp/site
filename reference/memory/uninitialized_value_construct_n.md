# uninitialized_value_construct_n
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator, class Size>
  ForwardIterator
    uninitialized_value_construct_n(ForwardIterator first,
                                    Size n); // (1)

  template <class ExecutionPolicy, class ForwardIterator, class Size>
  ForwardIterator
    uninitialized_value_construct_n(ExecutionPolicy&& exec,
                                    ForwardIterator first,
                                    Size n); // (2)
}
```

## 概要
未初期化領域の範囲のうち、先�N個の要素を値構築する。

未初期化領域の入力範囲`[first, first + n)`の各要素を値構築する (ゼ�初期化する)。


## 効果
以下と�価：

```cpp
for (; n > 0; (void)++first, --n)
  ::new (static_cast<void*>(addressof(*first)))
    typename iterator_traits<ForwardIterator>::value_type();
return first;
```
* addressof[link addressof.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]


### 例
```cpp example
#include <iostream>
#include <memory>

struct Vector {
  int x, y;
};

int main()
{
  std::allocator<Vector> alloc;

  // メモリ確保。
  // この段階では、[p, p + size)の領域は未初期化
  const std::size_t size = 3;
  Vector* p = alloc.allocate(size);

  // 未初期化領域[p, p + size)を値構築
  std::uninitialized_value_construct_n(p, size);

  // 各要素を出力
  for (std::size_t i = 0; i < size; ++i) {
    const Vector& v = *(p + i);
    std::cout << v.x << ',' << v.y << std::endl;
  }

  // オブジェクトを破棄
  std::destroy(p, p + size);

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* std::uninitialized_value_construct_n[color ff0000]
* std::allocator[link allocator.md]
* alloc.allocate[link allocator/allocate.md]
* alloc.deallocate[link allocator/deallocate.md]
* std::destroy[link destroy.md]

### 出力例
```
0,0
0,0
0,0
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
