# destroy_at
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  void destroy_at(T* location);
}
```

## 概要
デストラクタを呼び出す。

この関数は、配置`new`で構築したオブジェクトを破棄するために使用する。


## 効果
以下と等価：

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
  int* n = new(storage) int;

  *n = 314;
  std::cout << *n << std::endl;

  // デストラクタを呼び出して破棄
  std::destroy_at(n);
}
```
* std::destroy_at[color ff0000]

### 出力
```
314
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
