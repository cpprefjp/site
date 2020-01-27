# uninitialized_default_construct
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  void uninitialized_default_construct(ForwardIterator first,
                                       ForwardIterator last); // (1)

  template <class ExecutionPolicy, class ForwardIterator>
  void uninitialized_default_construct(ExecutionPolicy&& exec,
                                       ForwardIterator first,
                                       ForwardIterator last); // (2)
}
```

## 概要
未初期化領域の範囲の各要素をデフォルト構築する。

未初期化領域の入力範囲`[first, last)`の各要素をデフォルト構築する (ゼ�初期化しない)。


## 効果
以下と�価：

```cpp
for (; first != last; ++first)
  ::new (static_cast<void*>(addressof(*first)))
    typename iterator_traits<ForwardIterator>::value_type;
```
* addressof[link addressof.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]


## 戻り値
なし


## 備考
- [`std::vector`](/reference/vector/vector.md)クラスの要素数を変更する操作は、要素を値構築するためゼ�初期化が行われる。その値初期化のコストが気になるような場合に、デフォルト構築することでプ�グラマの責任で必要な分だけ任意に初期化でき、パフォーマンス向上が期待できるようになる。
     - 例としてBoost Container Libraryの`vector`クラスには、要素数を変更するメンバ関数にデフォルト構築のオプションとして[`default_init`](https://www.boost.org/doc/libs/release/doc/html/container/extended_functionality.html#container.extended_functionality.default_initialialization)がある


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

  // 未初期化領域[p, p + size)をデフォルト構築
  std::uninitialized_default_construct(p, p + size);

  // 各要素を出力
  // (値構築すると各値がゼ�初期化されるが、デフォルト構築ではゼ�初期化されない)
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
* std::uninitialized_default_construct[color ff0000]
* std::allocator[link allocator.md]
* alloc.allocate[link allocator/allocate.md]
* alloc.deallocate[link allocator/deallocate.md]
* std::destroy[link destroy.md]

### 出力例
```
1286073336,32742
1286073336,32742
-1,-1
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
