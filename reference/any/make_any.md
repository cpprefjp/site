# make_any
* any[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  any make_any(Args&& ...args); // (1)

  template <class T, class U, class... Args>
  any make_any(std::initializer_list<U> il,
               Args&& ...args); // (2)
}
```
* any[link any.md]

## 概要
`any`オブジェクトを生成するヘルパ関数。

`any`のコンストラクタ呼び出しでこの関数と�価のことを行う場合、先�の引数として[`std::in_place_type`](/reference/utility/in_place_type_t.md)タグを付加する必要があり冗長である。この関数は、その冗長さを回避するためにある。

- (1) : 任意の型`T`のコンストラクタ引数`args...`をとり、この関数内部で`T`型オブジェクトを構築して保持する`any`オブジェクトを構築する
- (2) : 任意の型`T`のコンストラクタ引数`il`と`args...`をとり、この関数内部で`T`型オブジェクトを構築して保持する`any`オブジェクトを構築する


## 効果
- (1) : `return any(`[`in_place_type`](/reference/utility/in_place_type_t.md)`<T>,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...);`と�価
- (2) : `return any(`[`in_place_type`](/reference/utility/in_place_type_t.md)`<T>, il,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...);`と�価


## 例
```cpp example
#include <any>
#include <string>
#include <vector>
#include <cassert>

int main()
{
  // (1)
  {
    // std::string型のオブジェクトを、コンストラクタ引数として3と'z'を渡して構築する
    std::any x = std::make_any<std::string>(3, 'z');
    assert(std::any_cast<std::string>(x) == "zzz");
  }

  // (2)
  {
    std::allocator<int> alloc;
    std::any x = std::make_any<std::vector<int>>({3, 1, 4}, alloc);

    const auto& vec = std::any_cast<const std::vector<int>&>(x);
    assert(vec[0] == 3);
    assert(vec[1] == 1);
    assert(vec[2] == 4);
  }
}
```
* std::make_any[color ff0000]
* std::any[link any.md]
* std::any_cast[link /reference/any/any_cast.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??
