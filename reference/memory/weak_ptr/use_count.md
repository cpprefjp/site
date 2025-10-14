# use_count
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
long
  use_count() const noexcept; // (1) C++11
constexpr long
  use_count() const noexcept; // (1) C++26
```

## 概要
監視している[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトの所有者数を取得する。


## 戻り値
`*this`が[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを監視していない空の状態なら、`0`を返す。

そうでなければ、[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトの所有者数([`shared_ptr`](/reference/memory/shared_ptr.md)`::`[`use_count()`](/reference/memory/shared_ptr/use_count.md))を返す。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::weak_ptr<int> wp;
  {
    std::shared_ptr<int> sp(new int(3));

    // shared_ptrオブジェクトspを監視する
    wp = sp;

    std::cout << wp.use_count() << std::endl;
  }

  std::cout << wp.use_count() << std::endl;
}
```
* use_count()[color ff0000]

### 出力
```
1
0
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 参照
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)