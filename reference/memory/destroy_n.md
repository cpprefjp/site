# destroy_n
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator, class Size>
  ForwardIterator destroy_n(ForwardIterator first, Size n); // (1)

  template <class ExecutionPolicy, class ForwardIterator, class Size>
  ForwardIterator destroy_n(ExecutionPolicy&& exec,
                            ForwardIterator first, Size n); // (2)
}
```

## 概要
範囲`[first, first + n)`の各要素に対してデストラクタを呼び出す。

この関数は、配置`new`で構築したオブジェクトの配列を破棄するために使用する。


## 効果
以下と�価：

```cpp
for (; n > 0; (void)++first, --n)
  destroy_at(addressof(*first));
return first;
```
* destroy_at[link destroy_at.md]
* addressof[link addressof.md]


## 備考
- 非自明なデストラクタをもたない`int`や`char`配列のような型のオブジェクトに対しては、デストラクタを呼び出す必要はない。`ForwardIterator`の値型`T`が[`std::is_trivially_destructible_v`](/reference/type_traits/is_trivially_destructible.md)`<T> == true`である場合、 (効果欄の`for`文も含めて) なにもしない最適化が行われる可能性がある
    - 例として、[`std::optional`](/reference/optional/optional.md)クラスの[デストラクタ](/reference/optional/optional/op_destructor.md)、および[`std::vector`](/reference/vector/vector.md)クラスの[デストラクタ](/reference/vector/vector/op_destructor.md)を参照


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  // 配置newで配列を構築
  char storage[4 * 3];
  int* n = new(storage) int[3];

  n[0] = 3;
  n[1] = 1;
  n[2] = 4;

  for (int i = 0; i < 3; ++i) {
    std::cout << n[i] << std::endl;
  }

  // デストラクタを呼び出して配列の各要素を破棄
  std::destroy_n(n, 3);
}
```
* std::destroy_n[color ff0000]

### 出力
```
3
1
4
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
