# elements_of
* ranges[meta header]
* class template[meta id-type]
* std::ranges[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<range R, class Allocator = allocator<byte>>
  struct elements_of {
    [[no_unique_address]] R range;
    [[no_unique_address]] Allocator allocator = Allocator();
  };

  template<class R, class Allocator = allocator<byte>>
    elements_of(R&&, Allocator = Allocator()) -> elements_of<R&&, Allocator>;
}
```
* allocator[link /reference/memory/allocator.md]


## 概要
ジェネレータ[`std::generator`](/reference/generator/generator.md)を戻り値型とする[コルーチン](/lang/cpp20/coroutines.md)において、`co_yield`式がネストしたRangeの要素を順次生成することを示すタグ型。


## テンプレートパラメータ制約
テンプレートパラメータ`R`は[`range`](range.md)コンセプトを満たすこと。


## メンバ変数

| 名前        | 説明      | 対応バージョン |
|-------------|-----------|----------------|
| `range`     | Range     | C++23 |
| `allocator` | Allocator | C++23 |


## 例
```cpp example
#include <generator>
#include <iostream>
#include <ranges>
#include <vector>

std::vector<int> vec{2, 3, 4};

// int値を生成するジェネーレタ・コルーチン
std::generator<int> func()
{
  // 値1を生成する
  co_yield 1;

  // vecの要素を1個づつ生成する
  co_yield std::ranges::elements_of(vec);
  // co_yield vec;では「std::vector<int>型の値を生成」の意味になり、
  // 戻り値型=int型ジェネレータに適合しないためコンパイルエラーとなる。

  // 値5を生成する
  co_yield 5;
}

int main()
{
  // ジェネレータを生成する
  std::generator<int> gen = func();
  // この時点ではコルーチンfuncはサスペンド状態にある

  // ジェネレータにより生成されるRange要素を列挙する
  for (int n : gen) {
    std::cout << n << std::endl;
  }
}
```
* std::ranges::elements_of[color ff0000]
* std::generator[link /reference/generator/generator.md]
* co_yield[link /lang/cpp20/coroutines.md]

### 出力
```
1
2
3
4
5
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`<generator>`](/reference/generator.md)

## 参照
- [P2502R2 `std::generator`: Synchronous Coroutine Generator for Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2502r2.pdf)
