# operator<=>
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* function template[meta id-type]

```cpp
friend constexpr common_comparison_category_t<synth-three-way-result<T1>, synth-three-way-result<T2>>
   operator<=>(const pair& x, const pair& y);
```
* common_comparison_category_t[link /reference/compare/common_comparison_category.md]

## 概要
2つの`pair`の三方比較を行う。


## 効果
以下と等価：

```cpp
if (auto c = synth-three-way(x.first, y.first); c != 0)
  return c;
return synth-three-way(x.second, y.second);
```


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <cassert>
#include <utility>
#include <string>

int main()
{
  std::pair<int, std::string> p1(1, "aaa");
  std::pair<int, std::string> p2(1, "aaa");
  std::pair<int, std::string> p3(2, "bbb");

  assert((p1 <=> p2) == 0);
  assert((p1 <=> p3) != 0);
  assert(p1 < p3);
  assert(p1 <= p3);
  assert(p3 > p1);
  assert(p3 >= p1);
}
```

### 出力
```
```

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
