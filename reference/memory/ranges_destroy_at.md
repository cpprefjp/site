# destroy_at
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <destructible T>
  constexpr void destroy_at(T* location) noexcept; // (1) C++20
}
```
* destructible[link /reference/concepts/destructible.md]

## 概要
デストラクタを呼び出す。

この関数は、配置`new`で構築したオブジェクトを破棄するために使用する。


## 効果
- 型`T`が配列型である場合、以下と等価：
    ```cpp
    destroy(begin(*location), end(*location));
    ```
    * destroy[link ranges_destroy.md]
    * begin[link /reference/iterator/begin.md]
    * end[link /reference/iterator/end.md]

- そうでない場合、以下と等価：
    ```cpp
    location->~T();
    ```

## 備考
- 非トリビアルなデストラクタをもたない`int`や`char`配列のような型のオブジェクトに対しては、デストラクタを呼び出す必要はない。[`std::is_trivially_destructible_v`](/reference/type_traits/is_trivially_destructible.md)`<T> == true`な型に対しては、なにもしない最適化が行われる可能性がある
    - 例として、[`std::optional`](/reference/optional/optional.md)クラスの[デストラクタ](/reference/optional/optional/op_destructor.md)、および[`std::vector`](/reference/vector/vector.md)クラスの[デストラクタ](/reference/vector/vector/op_destructor.md)を参照


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  // 配置newでオブジェクトを構築
  char storage[4];
  int* n = std::ranges::construct_at(reinterpret_cast<int*>(storage));

  *n = 314;
  std::cout << *n << std::endl;

  // デストラクタを呼び出して破棄
  std::ranges::destroy_at(n);
}
```
* std::ranges::destroy_at[color ff0000]
* std::ranges::construct_at[link ranges_construct_at.md]

### 出力
```
314
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`destroy_at`](destroy_at.md)

## 参照
- [P9896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
