# uninitialized_default_construct
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  void
    uninitialized_default_construct(ForwardIterator first,
                                    ForwardIterator last); // (1) C++17
  template <class ForwardIterator>
  constexpr void
    uninitialized_default_construct(ForwardIterator first,
                                    ForwardIterator last); // (1) C++26

  template <class ExecutionPolicy, class ForwardIterator>
  void
    uninitialized_default_construct(ExecutionPolicy&& exec,
                                    ForwardIterator first,
                                    ForwardIterator last); // (2) C++17
}
```

## 概要
未初期化領域の範囲の各要素をデフォルト構築する。

未初期化領域の入力イテレータ範囲`[first, last)`の各要素をデフォルト構築する (ゼロ初期化しない)。


## 効果
以下と等価：

```cpp
for (; first != last; ++first)
  ::new (static_cast<void*>(addressof(*first)))
    typename iterator_traits<ForwardIterator>::value_type;
```


## 戻り値
なし

## 例外

呼び出すコンストラクタなどから例外が送出された場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外が送出された場合は初期化対象領域は未初期化のままとなる。

## 備考
- [`std::vector`](/reference/vector/vector.md)クラスの要素数を変更する操作は、要素を値構築するためゼロ初期化が行われる。その値初期化のコストが気になるような場合に、デフォルト構築することでプログラマの責任で必要な分だけ任意に初期化でき、パフォーマンス向上が期待できるようになる。
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

  // 未初期化領域[p, p + size)の各要素をデフォルト構築
  std::uninitialized_default_construct(p, p + size);

  // 各要素を出力
  // (値構築すると各値がゼロ初期化されるが、デフォルト構築ではゼロ初期化されない)
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
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`ranges::uninitialized_default_construct`](ranges_uninitialized_default_construct.md)

## 参照
- [P0040R3 Extending memory management tools](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0040r3.html)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
- [P3369R0 `constexpr` for `uninitialized_default_construct`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3369r0.html)
    - 上記2文書で、C++26から`constexpr`がついた
