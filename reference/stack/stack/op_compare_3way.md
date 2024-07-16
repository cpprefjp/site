# operator<=>
* stack[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Container>
  compare_three_way_result_t<Container>
    operator<=>(const stack<T, Container>& x,
                const stack<T, Container>& y); // (1) C++20
}
```

## 概要
`stack` の三方比較を行う。


## 戻り値
`x.c <=> y.c`


## 例
```cpp example
#include <cassert>
#include <stack>

int main()
{
  std::stack<int> x;
  x.push(3);
  x.push(1);
  x.push(4);

  std::stack<int> y;
  y.push(3);
  y.push(1);
  y.push(4);

  assert((x <=> y) == 0);
}
```
* push[link push.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
