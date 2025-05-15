# ignore
* tuple[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct ignore-type { // 説明用の定義 (C++26)
    constexpr const ignore-type&
    operator=(const auto &) const noexcept
      { return *this; }
  };

  const unspecified ignore;            // (1) C++11
  inline constexpr unspecified ignore; // (1) C++17
  inline constexpr ignore-type ignore; // (1) C++26
}
```
* unspecified[italic]

## 概要
`ignore`は、[`tie()`](tie.md)を使用してタプルから値を抽出する際に、「不要な値」をマーキングするためのプレースホルダーである。

そのほか、関数の戻り値を明示的に無視する際にも使用できる。

C++26以降は、[`<utility>`](/reference/utility.md)をインクルードして使用することもできる。


## 例
### タプルの要素を取り出す際に一部の要素を無視する
```cpp example
#include <iostream>
#include <tuple>
#include <string>

std::tuple<int, char, std::string> f()
{
  return {1, 'a', "hello"};
}

int main() {
  // char要素は無視する
  int a;
  std::string c;
  std::tie(a, std::ignore, c) = f();

  std::cout << a << std::endl;
  std::cout << c << std::endl;
}
```
* std::ignore[color ff0000]

#### 出力
```
1
hello
```

### 関数の戻り値を無視する (C++17)
```cpp example
#include <iostream>
#include <tuple>
#include <string>

[[nodiscard]]
int print_string(std::string s)
{
  std::cout << s << std::endl;
  return 0;
}

int main() {
  // 自分の用途ではこの関数は必ず成功するため、
  // 戻り値を無視する
  std::ignore = print_string("hello");
}
```
* std::ignore[color ff0000]


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2008 [mark verified], 2010 [mark verified]


## 関連項目
- [`std::make_tuple`](make_tuple.md)
- [`std::forward_as_tuple`](forward_as_tuple.md)
- [`std::tie`](tie.md)
- [C++17 `[[nodiscard]]`属性](/lang/cpp17/nodiscard.md)
- [C++26 宣言のみで使用しない変数の名前として`_`をサポート](/lang/cpp26/nice_placeholder_with_no_name.md)


## 参照
- [P2968R2 Make `std::ignore` a first-class object](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2968r2.html)
