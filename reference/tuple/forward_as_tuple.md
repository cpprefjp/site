# forward_as_tuple
* tuple[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace {
  template <class... Types>
  tuple<Types&&...> forward_as_tuple(Types&&...) noexcept;           // C++11

  template <class... Types>
  constexpr tuple<Types&&...> forward_as_tuple(Types&&...) noexcept; // C++14
}
```

## 概要
パラメータの元の型からなる`tuple`を生成する。左辺値参照型は左辺値参照型として、右辺値は右辺値参照として転送される。


## 戻り値

パラメータの元の型からなる`tuple`オブジェクト


## 例外
投げない


## 例
```cpp example
#include <tuple>
#include <string>
#include <type_traits>

int main()
{
  // 一時オブジェクトからは右辺値参照のtupleが作られる
  auto t1 = std::forward_as_tuple(1, 'a', std::string("Hello"));
  static_assert(std::is_same<decltype(t1), std::tuple<int&&, char&&, std::string&&>>());

  // 左辺値からは左辺値参照のtupleが作られる
  int a = 1;
  char b = 'a';
  std::string c = "Hello";
  auto t2 = std::forward_as_tuple(a, b, c);
  static_assert(std::is_same<decltype(t2), std::tuple<int&, char&, std::string&>>());
}
```
* std::forward_as_tuple[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 


## 注意事項
`forward_as_tuple`は、ドラフト仕様の段階で`pack_arguments`という名前で一時期表記されていた。  
コンパイラのバージョンによっては、この名前での実装もありえる。

## 参照
- [LWG2275 - Why is forward_as_tuple not constexpr?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2275)
