# operator!=
* tuple[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template<class... TTypes, class... UTypes>
  bool operator!=(const tuple<TTypes...>& t,
                  const tuple<UTypes...>& u); // (1) C++11

  template<class... TTypes, class... UTypes>
  bool operator!=(const tuple<TTypes...>& t,
                  const tuple<UTypes...>& u); // (1) C++14
}
```

## 概要
2つの`tuple`オブジェクトの非等値比較を行う。


## 要件
2つの`tuple`オブジェクトの要素数が同じであること。


## 戻り値
`!(t` [`==`](op_equal.md) `u);`


## 例
```cpp example
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, const char*> t1(1, 'a', "hello");
  std::tuple<int, char, std::string> t2(1, 'a', "hello");
  std::tuple<int, char, std::string> t3(1, 'a', "hellot");

  std::cout << std::boolalpha;
  {
    bool result = t1 != t2;
    std::cout << result << std::endl;
  }
  {
    bool result = t1 != t3;
    std::cout << result << std::endl;
  }
}
```

### 出力
```
false
true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator==`](op_equal.md)


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
