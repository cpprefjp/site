# operator==
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T1, class T2>
  bool operator==(const pair<T1, T2>& x, const pair<T1, T2>& y);           // (1) C++03

  template <class T1, class T2>
  constexpr bool operator==(const pair<T1, T2>& x, const pair<T1, T2>& y); // (1) C++14

  template <class T1, class T2>
  struct pair {
    friend constexpr bool operator==(const pair&, const pair&) = default; // (1) C++20

    friend constexpr bool operator==(const pair& x, const pair& y)        // (2) C++20
        requires (is_reference_v<T1> || is_reference_v<T2>);
  };
}
```
* is_reference_v[link /reference/type_traits/is_reference.md]

## 概要
2つの`pair`の等値比較を行う


## テンプレートパラメータ制約
- 式`x.first == y.first`と`x.second == y.second`が妥当であり、型`decltype(x.first == y.first)`と`decltype(x.second == y.second)`が[boolean-testable](/reference/concepts/boolean-testable.md)のモデルであること


## 戻り値
```cpp
return x.first == y.first && x.second == y.second;
```


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <utility>
#include <string>

int main()
{
  std::pair<int, std::string> p1(1, "aaa");
  std::pair<int, std::string> p2(1, "aaa");
  std::pair<int, std::string> p3(2, "bbb");

  std::cout << std::boolalpha;
  std::cout << (p1 == p2) << std::endl;
  std::cout << (p1 == p3) << std::endl;
}
```

### 出力
```
true
false
```

## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [P2944R3 Comparisons for `reference_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2944r3.html)
    - C++26でテンプレートパラメータ制約が整理された
